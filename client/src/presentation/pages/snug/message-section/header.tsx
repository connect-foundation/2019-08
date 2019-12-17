import React from "react";
import styled from "styled-components";

const HeaderWrapper = styled.header`
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.snug};
  min-height: 50px;
  border-style: solid;
  border-color: ${({ theme }) => theme.snugBorderColor};
  border-width: 0.5px;
`;

export const MessageSectionHeader: React.FC = () => {
  return <HeaderWrapper></HeaderWrapper>;
};
