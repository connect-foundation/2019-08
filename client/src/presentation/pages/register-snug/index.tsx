import React from "react";
import styled from "styled-components";

import { GlobalHeader } from "presentation/components/atomic-reusable/global-header";
import { RegisterSnugForm } from "./register-snug-form";

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

export const RegisterSnug: React.FC = () => {
  return (
    <Wrapper>
      <GlobalHeader></GlobalHeader>
      <ContentsWrapper>
        <RegisterSnugForm></RegisterSnugForm>
      </ContentsWrapper>
    </Wrapper>
  );
};
