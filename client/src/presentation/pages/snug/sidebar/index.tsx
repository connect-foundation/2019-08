import React from "react";
import styled from "styled-components";
import { ChannelList } from "presentation/components/snug/channel-list";

const SidebarWrapper = styled.section`
  color: ${({ theme }) => theme.sidebarFont};
  font-size: 1.1rem;
  box-sizing: border-box;
  min-width: 250px;
  height: 100%;
  background-color: ${({ theme }) => theme.sidebar};
`;

export const Sidebar: React.FC = () => {
  return (
    <SidebarWrapper>
      <ChannelList></ChannelList>
    </SidebarWrapper>
  );
};
