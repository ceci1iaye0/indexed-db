import { useState } from "react";
import styled from "styled-components";

import { TProduct } from "../../../constants/types";
import IDBClient from "../../../services/IDBClient";

const Get = () => {
  const [products, setProducts] = useState<TProduct[]>([]);
  const [productId, setProductId] = useState<string>("");
  const [productName, setProductName] = useState<string>("");

  return (
    <Container>
      <InputsContainer>
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
          data-testid="get"
          style={{ height: "fit-content" }}
          onClick={() => {
            IDBClient.get(productId).then((results) => {
              if (results) setProducts([results as TProduct]);
            });
          }}
        >
          Get by Product Id
        </button>

        <Wrapper>
          <label>Product Name:</label>
          <input
            data-testid="name"
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </Wrapper>

        <button
          data-testid="get-by-index"
          style={{ height: "fit-content" }}
          onClick={() => {
            IDBClient.getByIndex("name", productName).then((results) => {
              if (results) setProducts(results as TProduct[]);
            });
          }}
        >
          Get by Product Name
        </button>

        <button
          data-testid="get-all"
          style={{ height: "fit-content" }}
          onClick={() => {
            IDBClient.getAll().then((results) => {
              if (results) setProducts(results as TProduct[]);
            });
          }}
        >
          Get All Products
        </button>
      </InputsContainer>

      <Table>
        <thead>
          <tr>
            <th>Product Id</th>
            <th>Product Name</th>
            <th>Product Description</th>
          </tr>
        </thead>
        <tbody>
          {products?.map((product) => (
            <tr key={product.id}>
              <td data-testid="product-id">{product.id}</td>
              <td data-testid="product-name">{product.name}</td>
              <td data-testid="product-description">{product.description}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default Get;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4vmin;
`;

const InputsContainer = styled.div`
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

const Table = styled.table`
  width: fit-content;
  border-spacing: 2vmin;
`;
