import React from "react";
import styled, { ThemeProvider } from "styled-components";
import { ChannelList } from "presentation/components/snug/channel-list";
import { colorTheme } from "presentation/theme/color-theme";

const SidebarWrapper = styled.section`
  color: ${({ theme }) => theme.sidebarFont};
  box-sizing: border-box;
  min-width: 250px;
  height: 100%;
  padding: 0px 20px;
  background-color: ${({ theme }) => theme.sidebar};
`;

export const Sidebar: React.FC = () => {
  return (
    <ThemeProvider theme={colorTheme}>
      <SidebarWrapper>
        <ChannelList></ChannelList>
      </SidebarWrapper>
    </ThemeProvider>
  );
};
