import React from "react";
import styled from "styled-components";
import { MessageSectionHeader } from "./message-section-header";
import { MessageSectionContent } from "./message-section-content";

const MessageSectionWrapper = styled.section`
  height: 100%;
  background-color: blue;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const MessageSection: React.FC = () => {
  return (
    <MessageSectionWrapper>
      <MessageSectionHeader></MessageSectionHeader>
      <MessageSectionContent></MessageSectionContent>
    </MessageSectionWrapper>
  );
};
