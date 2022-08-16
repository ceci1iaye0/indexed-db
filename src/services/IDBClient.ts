import { EIDBActions, EIDBConfig, IDB_DEFAULT_STORE } from "../constants";
import { getConnection, isStoreExists, makeRequest } from "./IDBHelper";

class IDBClient {
  STORE!: string;

  constructor(store?: string) {
    this.setStore(store);
  }

  setStore(store: string = IDB_DEFAULT_STORE): void {
    this.STORE = store;
  }

  async add(
    value: any,
    key?: string,
    store?: string
  ): Promise<{ [k: string]: any }> {
    return this.makeTransaction(
      "readwrite",
      EIDBActions.Add,
      key,
      value,
      store
    );
  }

  async update(
    value: any,
    key?: string,
    store?: string
  ): Promise<{ [k: string]: any }> {
    return this.makeTransaction(
      "readwrite",
      EIDBActions.Update,
      key,
      value,
      store
    );
  }

  async getAll(store?: string): Promise<{ [k: string]: any }[]> {
    return this.makeTransaction(
      "readonly",
      EIDBActions.GetAll,
      undefined,
      undefined,
      store
    );
  }

  async getByIndex(
    index: string,
    value: any,
    store?: string
  ): Promise<{ [k: string]: any }[]> {
    return this.makeTransaction(
      "readonly",
      EIDBActions.GetByIndex,
      index,
      value,
      store
    );
  }

  async get(value: any, store?: string): Promise<{ [k: string]: any }> {
    return this.makeTransaction(
      "readonly",
      EIDBActions.Get,
      undefined,
      value,
      store
    );
  }

  async deleteDb(): Promise<void> {
    window.indexedDB?.deleteDatabase(EIDBConfig.Db);
  }

  async deleteAll(store?: string): Promise<void> {
    return this.makeTransaction(
      "readwrite",
      EIDBActions.DeleteAll,
      undefined,
      undefined,
      store
    );
  }

  async delete(value: any, store?: string): Promise<void> {
    return this.makeTransaction(
      "readwrite",
      EIDBActions.Delete,
      undefined,
      value,
      store
    );
  }

  async makeTransaction(
    mode: IDBTransactionMode,
    action: EIDBActions,
    key?: string,
    value?: any,
    store?: string
  ): Promise<any> {
    this.setStore(store);
    const db = await getConnection();

    return new Promise((resolve, reject) => {
      isStoreExists(db, this.STORE, reject);
      const transaction = db.transaction(this.STORE, mode);
      const objectStore = transaction.objectStore(this.STORE);
      const request = makeRequest(objectStore, action, key, value, reject);

      request.onsuccess = (e: any) => {
        resolve(e.target.result);
      };

      request.onerror = (e: any) => {
        reject(e.target.error.message);
      };

      transaction.oncomplete = () => {
        db.close();
      };
    });
  }
}

export default new IDBClient();
