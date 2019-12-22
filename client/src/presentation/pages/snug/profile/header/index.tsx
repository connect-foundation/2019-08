import React from "react";
import styled from "styled-components";

const Title = styled.header`
  height: 10%;
  color: ${({ theme }) => theme.snugMainFont};
  text-align: center;
  font-size: 2.5rem;
  cursor: default;
  @media (min-width: 800px) {
    width: 250px;
    min-width: 250px;
  }
  @media (min-width: 1200px) {
    width: 400px;
    min-width: 400px;
  }
`;

export const Header: React.FC = () => {
  return <Title>Profile</Title>;
};
