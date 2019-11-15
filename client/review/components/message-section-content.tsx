import React from "react";
import styled from "styled-components";
import { ChatContent } from "./chat-content";
import { ChatInputBox } from "./chat-input-box";

const MessageSectionContentWrapper = styled.section`
  width: 100%;
  height: 100%;
  background-color: white;
  display: flex;
  flex-direction: column;
`;

export const MessageSectionContent: React.FC = () => {
  return (
    <MessageSectionContentWrapper>
      <ChatContent></ChatContent>
      <ChatInputBox></ChatInputBox>
    </MessageSectionContentWrapper>
  );
};
