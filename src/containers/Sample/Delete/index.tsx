import { useState } from "react";
import styled from "styled-components";

import IDBClient from "../../../services/IDBClient";

const Delete = () => {
  const [productId, setProductId] = useState<string>("");

  return (
    <Container>
      <Wrapper>
        <label>Product Id:</label>
        <input
          data-testid="id"
          type="text"
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
        />
      </Wrapper>

      <button
        data-testid="delete-by-id"
        style={{ height: "fit-content" }}
        onClick={() => {
          IDBClient.delete(productId);
        }}
      >
        Delete by Product ID
      </button>

      <button
        data-testid="delete-all"
        style={{ height: "fit-content" }}
        onClick={() => {
          IDBClient.deleteAll();
        }}
      >
        Delete All Products
      </button>

      <button
        data-testid="delete-db"
        style={{ height: "fit-content" }}
        onClick={() => {
          IDBClient.deleteDb();
        }}
      >
        Delete Database
      </button>
    </Container>
  );
};

export default Delete;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2vmin;

  align-items: end;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1vmin;
`;
