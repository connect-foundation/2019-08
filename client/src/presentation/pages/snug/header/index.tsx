import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const HeaderWrapper = styled.header`
  display: flex;
  justify-content: center;
  background-color: ${({ theme }) => theme.snug};
  min-height: 50px;
  width: 100%;
`;

const SnugLogo = styled.img`
  height: 50px;
`;

export const SnugHeader: React.FC = () => {
  return (
    <HeaderWrapper>
      <Link to="/">
        <SnugLogo src="https://user-images.githubusercontent.com/44811887/69320358-6650a900-0c84-11ea-9a70-2ffe45b05604.png" />
      </Link>
    </HeaderWrapper>
  );
};
