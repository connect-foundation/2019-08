import React from "react";
import styled, { ThemeProvider } from "styled-components";
import { colorTheme } from "presentation/theme/color-theme";

const Wrapper = styled.section`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
`;

export const CustomModal: React.FC = ({ children }) => {
  return (
    <ThemeProvider theme={colorTheme}>
      <Wrapper>{children}</Wrapper>
    </ThemeProvider>
  );
};
