import styled from "styled-components";

import AddUpdate from "./AddUpdate";
import Delete from "./Delete";
import Get from "./Get";

const Sample = () => {
  return (
    <Container>
      <AddUpdate />
      <Delete />
      <Get />
    </Container>
  );
};

export default Sample;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6vmin;
  padding: 2vmin;
`;
