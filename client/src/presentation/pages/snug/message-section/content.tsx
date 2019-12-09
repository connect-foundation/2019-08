import React from "react";
import styled from "styled-components";
import { ChatContent } from "presentation/components/snug/chat-container";
import { ChatInputBox } from "presentation/components/snug/chat-input-box";
import { MessageContextProvider } from "contexts/messages-context";
import { AppSocketChannelMatchProps } from "prop-types/match-extends-types";
import { Preview } from "presentation/components/snug/preview";
const MessageSectionContentWrapper = styled.section`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.snug};
  display: flex;
  flex-direction: column;
  overflow: auto;
`;

export const MessageSectionContent: React.FC<AppSocketChannelMatchProps> = props => {
  return (
    <MessageContextProvider>
      <MessageSectionContentWrapper>
        <ChatContent {...props} />
        <Preview></Preview>
        <ChatInputBox {...props} />
      </MessageSectionContentWrapper>
    </MessageContextProvider>
  );
};
