import React from "react";
import styled from "styled-components";

const Wrapper = styled.section`
  height: 100%;
  width: 100%;
`;

const Title = styled.header`
  color: ${({ theme }) => theme.snugMainFont};
  margin-bottom: 0.3rem;
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
  padding-left: 4px;
  margin-bottom: 1rem;
  &:active,
  :focus {
    border: 1px solid #2c5af7;
  }
`;

interface PropTypes {
  title: string;
  placeholder: string;
  onChange?(parameter: any | void): any | void;
}

export const ModalInput: React.FC<PropTypes> = props => {
  const { title, onChange, placeholder } = props;
  return (
    <Wrapper>
      <Title>{title}</Title>
      <Input onChange={onChange} placeholder={placeholder} />
    </Wrapper>
  );
};
