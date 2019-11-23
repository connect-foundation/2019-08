import React from "react";
import styled from "styled-components";
import { ChatContent } from "presentation/components/snug/chat-container";
import { ChatInputBox } from "presentation/components/snug/chat-input-box";
import { MessageContextProvider } from "contexts/messages-context";

const MessageSectionContentWrapper = styled.section`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.snug};
  display: flex;
  flex-direction: column;
`;

export const MessageSectionContent: React.FC = () => {
  return (
    <MessageContextProvider>
      <MessageSectionContentWrapper>
        <ChatContent />
        <ChatInputBox />
      </MessageSectionContentWrapper>
    </MessageContextProvider>
  );
};
