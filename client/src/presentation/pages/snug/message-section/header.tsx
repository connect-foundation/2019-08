import React from "react";
import styled from "styled-components";

const HeaderWrapper = styled.header`
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.snug};
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.snugMainFont};
  padding-left: 10px;
  font-weight: bold;
  font-size: 1.3rem;
  min-height: 50px;
  max-height: 50px;
  border: none;
  border-top: 0.5px solid ${({ theme }) => theme.snugBorderColor};
  border-bottom: 0.5px solid ${({ theme }) => theme.snugBorderColor};
`;

export const MessageSectionHeader: React.FC = () => {
  return <HeaderWrapper>CHAT</HeaderWrapper>;
};
