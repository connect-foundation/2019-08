import React from "react";
import styled from "styled-components";

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
