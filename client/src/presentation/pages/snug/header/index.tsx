import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const HeaderWrapper = styled.header`
  display: flex;
  justify-content: center;
  background-color: ${({ theme }) => theme.snug};
  min-height: 50px;
  max-height: 50px;
  width: 100%;
`;

const SnugLogo = styled.img`
  height: 50px;
`;

export const SnugHeader: React.FC = () => {
  return (
    <HeaderWrapper>
      <Link to="/">
        <SnugLogo src="https://user-images.githubusercontent.com/44811887/69315262-6c8d5800-0c79-11ea-8d87-ccd8f8d98826.png" />
      </Link>
    </HeaderWrapper>
  );
};
