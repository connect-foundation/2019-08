import React from "react";
import styled from "styled-components";

const Wrapper = styled.section`
  height: 100%;
  width: 100%;
`;

const Title = styled.header`
  color: ${({ theme }) => theme.snugMainFont};
  margin-bottom: 10px;
`;

const Input = styled.input`
  background-color: #ffffff;
  border-color: ${({ theme }) => theme.snugBorderColor};
  border: 1px solid;
  appearance: none;
  border-radius: 10px;
  min-height: 30px;
  max-height: 30px;
  height: 30px;
  width: 100%;
  box-sizing: border-box;
  &:active,
  :focus {
    border: 2px solid #2c5af7;
  }
`;

interface PropTypes {
  title: string;
}

export const ModalInput: React.FC<PropTypes> = props => {
  const { title } = props;
  return (
    <Wrapper>
      <Title>{title}</Title>
      <Input />
    </Wrapper>
  );
};
