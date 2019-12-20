import React from "react";
import styled, { ThemeProvider } from "styled-components";
import { colorTheme } from "presentation/theme/color-theme";

const Wrapper = styled.section`
  position: fixed;
  z-index: 7;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: ${({ theme }) => theme.snug};
`;

export const CustomModal: React.FC = ({ children }) => {
  return (
    <ThemeProvider theme={colorTheme}>
      <Wrapper>{children}</Wrapper>
    </ThemeProvider>
  );
};
