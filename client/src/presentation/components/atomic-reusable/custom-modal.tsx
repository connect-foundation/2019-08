import React from "react";
import styled from "styled-components";

const Wrapper = styled.section`
  position: absolute;
  width: 100vw;
  height: 100vh;
  z-index: 1;
  background-color: #000000;
  color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const CustomModal: React.FC = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};
