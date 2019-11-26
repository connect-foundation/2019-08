import React from "react";
import styled, { ThemeProvider } from "styled-components";
import { colorTheme } from "presentation/theme/color-theme";

const Wrapper = styled.section`
  position: absolute;
  width: 100vw;
  height: 100vh;
  z-index: 1;
  background-color: ${({ theme }) => theme.snug};
  color: ${({ theme }) => theme.snugMainFont};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const CustomModal: React.FC = ({ children }) => {
  return (
    <ThemeProvider theme={colorTheme}>
      <Wrapper>{children}</Wrapper>
    </ThemeProvider>
  );
};
