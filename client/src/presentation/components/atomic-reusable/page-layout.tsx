import React from "react";
import styled from "styled-components";
import { GlobalHeader } from "./global-header";

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
`;

const ContentsWrapper = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 95vh;
  width: 100vw;
`;

export const PageLayout: React.FC = ({ children }) => {
  return (
    <Wrapper>
      <GlobalHeader></GlobalHeader>
      <ContentsWrapper>{children}</ContentsWrapper>
    </Wrapper>
  );
};
