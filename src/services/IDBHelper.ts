import { EIDBActions, EIDBConfig, IDB_STORES } from "../constants";

export const isStoreExists = (
  db: IDBDatabase,
  store: string,
  reject?: any
): boolean | void => {
  const isExist = db.objectStoreNames.contains(store);
  if (reject && !isExist) reject(`Store ${store} not found`);
  if (!reject) return isExist;
};

export const isIndexExists = (
  objectStore: IDBObjectStore,
  index: string,
  reject?: any
): boolean | void => {
  const isExist = objectStore.indexNames.contains(index);
  if (reject && !isExist) reject(`Index ${index} not found`);
  if (!reject) return isExist;
};

export const makeRequest = (
  objectStore: IDBObjectStore,
  action: EIDBActions,
  key?: any,
  value?: any,
  reject?: any
): IDBRequest => {
  let request: IDBRequest;

  switch (action) {
    case EIDBActions.Add:
      request = objectStore.add(value);
      break;
    case EIDBActions.Update:
      request = objectStore.put(value);
      break;
    case EIDBActions.GetByIndex:
      isIndexExists(objectStore, key, reject);
      request = objectStore.index(key).getAll(value);
      break;
    case EIDBActions.Get:
      request = objectStore.get(value);
      break;
    case EIDBActions.DeleteAll:
      request = objectStore.clear();
      break;
    case EIDBActions.Delete:
      request = objectStore.delete(value);
      break;
    default:
      request = objectStore.getAll();
      break;
  }

  return request;
};

export const getConnection = async (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    if (!window.indexedDB) {
      reject("Your browser doesn't support a stable version of IndexedDB");
    } else {
      const request = indexedDB.open(EIDBConfig.Db, EIDBConfig.Version);

      request.onsuccess = () => {
        resolve(request.result);
      };

      request.onerror = (e: any) => {
        reject(e.target.error.message);
      };

      request.onupgradeneeded = (e: any) => {
        const db = e.target.result as IDBDatabase;
        IDB_STORES.forEach((store) => {
          if (!isStoreExists(db, store.name)) {
            const objectStore = db.createObjectStore(store.name, store.id);
            store.indices?.forEach((index) => {
              objectStore.createIndex(
                index.name,
                index.keyPath,
                index?.options
              );
            });
          }
        });
      };
    }
  });
};
