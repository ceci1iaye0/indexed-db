import { TIDBStore } from "./types";

export enum EIDBConfig {
  Db = "catalogue",
  Version = 1,
}

export enum EIDBStoreNames {
  Products = "products",
}

export const IDB_DEFAULT_STORE = EIDBStoreNames.Products;

export const IDB_STORES: TIDBStore[] = [
  {
    name: EIDBStoreNames.Products,
    id: { keyPath: "id" },
    indices: [{ name: "name", keyPath: "name", options: { unique: false } }],
  },
];

export enum EIDBActions {
  Add = "add",
  Update = "update",
  GetAll = "getAll",
  GetByIndex = "getByIndex",
  Get = "get",
  DeleteAll = "deleteAll",
  Delete = "delete",
}
