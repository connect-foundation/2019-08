import React from "react";
import styled from "styled-components";
import { ModalThumbnail } from "./thumbnail";

const Wrapper = styled.section`
  width: 35%;
  min-width: 35%;
  background-color: color: ${({ theme }) => theme.snugMenuColor};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  `;

const ImageWrapper = styled.section`
  height: 30%;
  margin-bottom: 10px;
`;

const Button = styled.button`
  cursor: pointer;
  background-color: ${({ theme }) => theme.snugMenuColor};
  color: ${({ theme }) => theme.snugMainFont};
  width: 100%;
  border-radius: 5px;
  border-color: ${({ theme }) => theme.snugMainFont};
  border: 1px solid;
  margin-bottom: 10px;
`;

const Remove = styled.section`
  cursor: pointer;
  color: #1d8fc0;
  font-size: 0.9rem;
  text-align: center;
  &: hover {
    text-decoration: underline;
  }
`;

export const ModalRightBody: React.FC = () => {
  return (
    <Wrapper>
      <ImageWrapper>
        <ModalThumbnail />
      </ImageWrapper>
      <Button>Image 올리기</Button>
      <Remove>Image 삭제하기</Remove>
    </Wrapper>
  );
};
