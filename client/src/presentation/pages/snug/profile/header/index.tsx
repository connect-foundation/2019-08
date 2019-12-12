import React from "react";
import styled from "styled-components";

const Wrapper = styled.header`
  height: 10%;
  color: black;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 2.5rem;
  border-bottom: 1px black solid;
`;

const Title = styled.section`
  text-align: center;
  width: 60%;
`;

const CloseButton = styled.section`
  color: black;
  cursor: pointer;
  text-align: center;
  width: 20%;
`;

export const Header: React.FC = () => {
  return (
    <Wrapper>
      <Title>Profile</Title>
      <CloseButton>&#10799;</CloseButton>
    </Wrapper>
  );
};
