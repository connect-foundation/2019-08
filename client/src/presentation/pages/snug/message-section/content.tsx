import React from "react";
import styled from "styled-components";
import { ChatContent } from "presentation/components/snug/chat-container";
import { ChatInputBox } from "presentation/components/snug/chat-input-box";
import { MessageContextProvider } from "contexts/messages-context";
import { ProfileSection } from "presentation/pages/snug/profile";
import { AppSocketChannelMatchProps } from "prop-types/match-extends-types";

const MessageSectionContentWrapper = styled.section`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.snug};
  display: flex;
  flex-direction: column;
  overflow: auto;
`;

const Wrapper = styled.section`
  display: flex;
  justify-content: space-between;
  height: 100%;
  width: 100%;
`;

export const MessageSectionContent: React.FC<AppSocketChannelMatchProps> = props => {
  return (
    <MessageContextProvider>
      <Wrapper>
        <MessageSectionContentWrapper>
          <ChatContent {...props} />
          <ChatInputBox {...props} />
        </MessageSectionContentWrapper>
        <ProfileSection />
      </Wrapper>
    </MessageContextProvider>
  );
};
