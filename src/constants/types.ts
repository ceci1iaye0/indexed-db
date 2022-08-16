export type TIDBIndex = {
  name: string;
  keyPath: string;
  options?: IDBIndexParameters;
};

export type TIDBStore = {
  name: string;
  id: IDBObjectStoreParameters;
  indices?: TIDBIndex[];
};

export type TProduct = {
  id: string;
  name: string;
  description: string;
};
