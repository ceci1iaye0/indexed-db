import { useState } from "react";
import styled from "styled-components";

import { TProduct } from "../../../constants/types";
import IDBClient from "../../../services/IDBClient";

const AddUpdate = () => {
  const [product, setProduct] = useState<TProduct>({
    id: "",
    name: "",
    description: "",
  });

  return (
    <Container>
      <Wrapper>
        <label>Product Id:</label>
        <input
          data-testid="id"
          type="text"
          value={product.id}
          onChange={(e) => setProduct({ ...product, id: e.target.value })}
        />
      </Wrapper>

      <Wrapper>
        <label>Product Name:</label>
        <input
          data-testid="name"
          type="text"
          value={product.name}
          onChange={(e) => setProduct({ ...product, name: e.target.value })}
        />
      </Wrapper>

      <Wrapper>
        <label>Product Description:</label>
        <input
          data-testid="description"
          type="text"
          value={product.description}
          onChange={(e) =>
            setProduct({ ...product, description: e.target.value })
          }
        />
      </Wrapper>

      <button
        data-testid="add"
        style={{ height: "fit-content" }}
        onClick={() => {
          IDBClient.add(product);
        }}
      >
        Add Product
      </button>

      <button
        data-testid="update"
        style={{ height: "fit-content" }}
        onClick={() => {
          IDBClient.update(product);
        }}
      >
        Update Product
      </button>
    </Container>
  );
};

export default AddUpdate;

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
