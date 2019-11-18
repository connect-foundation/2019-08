import React from "react";
import styled from "styled-components";
import { Sidebar } from "./sidebar";
import { SnugHeader } from "./header";
import { ChannelPlusModal } from "../components/channel-plus-modal";
import { ChannelsProvider } from "../../contexts/channel-context";
import { ModalProvider } from "../../contexts/modal-context";

const SnugWrapper = styled.section`
  width: inherit;
  height: inherit;
  display: flex;
  flex-direction: column;
`;

const ViewWrapper = styled.section`
  height: 100%;
  display: flex;
`;

export const Snug: React.FC = () => {
  return (
    <SnugWrapper>
      <ChannelsProvider>
        <ModalProvider>
          <ChannelPlusModal />
          <SnugHeader></SnugHeader>
          <ViewWrapper>
            <Sidebar></Sidebar>
            <MessageSection></MessageSection>
          </ViewWrapper>
        </ModalProvider>
      </ChannelsProvider>
    </SnugWrapper>
  );
};
