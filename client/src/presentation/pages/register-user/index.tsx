import React, { useState } from "react";
import styled from "styled-components";

import { GlobalHeader } from "presentation/components/atomic-reusable/global-header";

import { RegisterUserForm } from "presentation/pages/register-user/register-user-form";

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

export const RegisterUser: React.FC = () => {
  return (
    <Wrapper>
      <GlobalHeader></GlobalHeader>
      <ContentsWrapper>
        <RegisterUserForm />
      </ContentsWrapper>
    </Wrapper>
  );
};
