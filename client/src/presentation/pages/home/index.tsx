import React, { useState } from "react";
import styled from "styled-components";

import { GlobalHeader } from "presentation/components/atomic-reusable/global-header";
import { HomeForm } from "./home-form";
import { HomeSnug } from "./home-snug";

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

export const Home: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Wrapper>
      <GlobalHeader></GlobalHeader>
      <ContentsWrapper>
        {isLoggedIn ? <HomeForm /> : <HomeSnug />}
      </ContentsWrapper>
    </Wrapper>
  );
};
