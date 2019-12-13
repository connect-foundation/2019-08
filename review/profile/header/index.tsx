import React from "react";
import styled from "styled-components";

const Title = styled.header`
  height: 10%;
  color: ${({ theme }) => theme.snugMainFont};
  text-align: center;
  font-size: 2.5rem;
  max-width: 400px;
  cursor: default;
`;

export const Header: React.FC = () => {
  return <Title>Profile</Title>;
};
