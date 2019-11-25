import React from "react";
import styled from "styled-components";
import { Sidebar } from "./sidebar";
import { SnugHeader } from "./header";
import { ChannelsProvider } from "contexts/channel-context";
import { ModalProvider } from "contexts/modal-context";
import { MessageSection } from "./message-section";
import { AppSocketChannelMatchProps } from "prop-types/match-extends-types";
import { Modals } from "presentation/components/snug/modals";

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

export const Snug: React.FC<AppSocketChannelMatchProps> = props => {
  const { Application } = props;
  return (
    <SnugWrapper>
      <ChannelsProvider>
        <ModalProvider>
          <Modals Application={Application} />
          <SnugHeader />
          <ViewWrapper>
            <Sidebar {...props} />
            <MessageSection {...props} />
          </ViewWrapper>
        </ModalProvider>
      </ChannelsProvider>
    </SnugWrapper>
  );
};
