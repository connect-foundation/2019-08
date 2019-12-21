import React from "react";
import styled from "styled-components";
import { GlobalHeader } from "./global-header";
import { ApplicationProptype } from "prop-types/application-type";

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
`;

const ContentsWrapper = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 95vh;
  width: 100%;
`;

export const PageLayout: React.FC<ApplicationProptype> = ({
  children,
  Application
}) => {
  return (
    <Wrapper>
      <GlobalHeader Application={Application}></GlobalHeader>
      <ContentsWrapper>{children}</ContentsWrapper>
    </Wrapper>
  );
};
