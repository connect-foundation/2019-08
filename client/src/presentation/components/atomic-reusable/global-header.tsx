import React from "react";
import styled from "styled-components";

import { CustomButton } from "./custom-button";

const Wrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #4096cb;
  padding: 10px;
  height: 5vh;
  box-sizing: border-box;
`;

const Title = styled.section`
  color: #ffffff;
  font-size: 1.4rem;
`;

export const GlobalHeader: React.FC = () => {
  return (
    <Wrapper>
      <Title> Snug </Title>
      <CustomButton
        color={"#fda600"}
        size={"big"}
        name={"회원가입"}
        fontColor={"#ffffff"}
        fontWeight={"bold"}
      ></CustomButton>
    </Wrapper>
  );
};
