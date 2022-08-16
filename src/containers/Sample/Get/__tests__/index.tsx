import { fireEvent, render, screen } from "@testing-library/react";

import IDBClient from "../../../../services/IDBClient";
import Get from "..";

window.indexedDB = require("fake-indexeddb");

describe("Get", () => {
  let mockGet: any;
  let mockGetByIndex: any;
  let mockGetAll: any;

  beforeEach(() => {
    mockGet = jest.spyOn(IDBClient, "get");
    mockGetByIndex = jest.spyOn(IDBClient, "getByIndex");
    mockGetAll = jest.spyOn(IDBClient, "getAll");
  });

  afterEach(() => {
    mockGet.mockRestore();
    mockGetByIndex.mockRestore();
    mockGetAll.mockRestore();
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it("Should be able to execute IDBClient.get()", () => {
    const id = "1";
    render(<Get />);

    fireEvent.change(screen.getByTestId("id"), { target: { value: id } });
    fireEvent.click(screen.getByTestId("get"));

    expect(mockGet).toHaveBeenCalledWith(id);
  });

  it("Should be able to execute IDBClient.getByIndex()", () => {
    const name = "Milk";
    render(<Get />);

    fireEvent.change(screen.getByTestId("name"), { target: { value: name } });
    fireEvent.click(screen.getByTestId("get-by-index"));

    expect(mockGetByIndex).toHaveBeenCalledWith("name", name);
  });

  it("Should be able to execute IDBClient.getAll()", () => {
    render(<Get />);
    fireEvent.click(screen.getByTestId("get-all"));
    expect(mockGetAll).toHaveBeenCalled();
  });
});
