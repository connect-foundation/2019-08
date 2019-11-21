import React from "react";
import styled from "styled-components";
import { ChannelList } from "presentation/components/snug/channel-list";
import { AppSocketChannelMatchProps } from "prop-types/match-extends-types";

const SidebarWrapper = styled.section`
  min-width: 250px;
  height: 100%;
  background-color: red;
`;

export const Sidebar: React.FC<AppSocketChannelMatchProps> = ({
  match,
  socket
}) => {
  return (
    <SidebarWrapper>
      <ChannelList match={match} socket={socket}></ChannelList>
    </SidebarWrapper>
  );
};
