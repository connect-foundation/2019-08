import React from "react";
import styled from "styled-components";
import { ChatContent } from "presentation/components/snug/chat-container";
import { ChatInputBox } from "presentation/components/snug/chat-input-box";
import { MessageContextProvider } from "contexts/messages-context";
import { ProfileSection } from "presentation/pages/snug/profile";
import { ChannelRouteComponentType } from "prop-types/channel-match-type";

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

export const MessageSectionContent: React.FC<ChannelRouteComponentType> = props => {
  return (
    <MessageContextProvider>
      <Wrapper>
        <MessageSectionContentWrapper>
          <ChatContent {...props} />
          <ChatInputBox />
        </MessageSectionContentWrapper>
        <ProfileSection {...props} />
      </Wrapper>
    </MessageContextProvider>
  );
};
