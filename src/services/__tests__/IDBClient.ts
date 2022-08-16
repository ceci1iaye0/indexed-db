import IDBClient from "../IDBClient";

window.indexedDB = require("fake-indexeddb");

describe("IDBClient", () => {
  const products = [
    {
      id: "1",
      name: "Milk",
      description: "50ml",
    },
    {
      id: "2",
      name: "Milk",
      description: "100ml",
    },
    {
      id: "3",
      name: "Coke",
      description: "50ml",
    },
  ];

  it("Should be able to add records", async () => {
    await Promise.all(
      products.map(async (product) => await IDBClient.add(product))
    );
    const results = await IDBClient.getAll();
    expect(results).toEqual(products);
  });

  it("Should be able to update a record", async () => {
    const update = {
      id: "3",
      name: "Coke",
      description: "100ml",
    };
    await IDBClient.update(update);
    const results = await IDBClient.get("3");
    expect(results).toEqual(update);
  });

  it("Should be able to get by index", async () => {
    const results = await IDBClient.getByIndex("name", "Milk");
    expect(results).toEqual([products[0], products[1]]);
  });

  it("Should be able to delete by id", async () => {
    await IDBClient.delete("3");
    const results = await IDBClient.get("3");
    expect(results).toBeUndefined();
  });

  it("Should be able to delete all", async () => {
    await IDBClient.deleteAll();
    const results = await IDBClient.getAll();
    expect(results).toEqual([]);
  });

  it("Should be able to delete db", async () => {
    await IDBClient.deleteDb();
  });
});
