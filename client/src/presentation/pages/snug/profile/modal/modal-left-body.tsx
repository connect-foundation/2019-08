import React from "react";
import styled from "styled-components";
import { ModalInput } from "./modal-input";

const Wrapper = styled.section`
  width: 60%;
  min-width: 60%;
  background-color: ${({ theme }) => theme.snugMenuColor};
  display: flex;
  flex-direction: column;
`;

export const ModalLeftBody: React.FC = () => {
  return (
    <Wrapper>
      <ModalInput title={"이름"}></ModalInput>
      <ModalInput title={"설명"}></ModalInput>
      <ModalInput title={"상태"}></ModalInput>
      <ModalInput title={"전화번호"}></ModalInput>
    </Wrapper>
  );
};
