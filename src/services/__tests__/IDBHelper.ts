import { IDB_DEFAULT_STORE } from "../../constants";
import { getConnection, isIndexExists, isStoreExists } from "../IDBHelper";

window.indexedDB = require("fake-indexeddb");

describe("IDBHelper", () => {
  let db: IDBDatabase;
  let objectStore: IDBObjectStore;

  beforeAll(async () => {
    db = await getConnection();
    objectStore = db
      .transaction(IDB_DEFAULT_STORE, "readonly")
      .objectStore(IDB_DEFAULT_STORE);
  });

  afterAll(() => {
    db.close();
  });

  describe("isStoreExists()", () => {
    it("Should return false if store does not exists in db", () => {
      expect(isStoreExists(db, "random store")).toBe(false);
    });

    it("Should return true if store exists in db", () => {
      expect(isStoreExists(db, IDB_DEFAULT_STORE)).toBe(true);
    });

    it("Should reject if store does not exists in db", () => {
      expect(
        new Promise((resolve, reject) =>
          isStoreExists(db, "random store", reject)
        )
      ).rejects.toEqual("Store random store not found");
    });
  });

  describe("isIndexExists()", () => {
    it("Should return false if index does not exists in store", () => {
      expect(isIndexExists(objectStore, "random index")).toBe(false);
    });

    it("Should return true if index exists in store", () => {
      expect(isIndexExists(objectStore, "name")).toBe(true);
    });

    it("Should reject if index does not exists in db", () => {
      expect(
        new Promise((resolve, reject) =>
          isIndexExists(objectStore, "random index", reject)
        )
      ).rejects.toEqual("Index random index not found");
    });
  });

  describe("getConnection()", () => {
    it("Should reject if IDB is not supported", () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      window.indexedDB = undefined;
      expect(getConnection()).rejects.toEqual(
        "Your browser doesn't support a stable version of IndexedDB"
      );
    });
  });
});
