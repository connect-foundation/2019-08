import React from "react";
import styled from "styled-components";
import { ModalLeftBody } from "./modal-left-body";
import { ModalRightBody } from "./modal-right-body";

const Wrapper = styled.form`
  display: flex;
  width: 90%;
  height: 70%;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const ButtonWrapper = styled.section`
  width: 100%;
  min-width: 100%;
  display: flex;
  height: 40px;
  justify-content: flex-end;
`;

const Button = styled.button`
  cursor: pointer;
  background-color: ${({ theme }) => theme.snugMenuColor};
  color: ${({ theme }) => theme.snugMainFont};
  width: 20%;
  border-radius: 5px;
  border-color: ${({ theme }) => theme.snugMainFont};
  border: 1px solid;
  margin-bottom: 10px;
  margin-left: 10px;
`;

export const ModalBody: React.FC = () => {
  return (
    <Wrapper>
      <ModalLeftBody />
      <ModalRightBody />
      <ButtonWrapper>
        <Button>취소</Button>
        <Button>제출</Button>
      </ButtonWrapper>
    </Wrapper>
  );
};
