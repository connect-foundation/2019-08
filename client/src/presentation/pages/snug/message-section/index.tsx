import React from "react";
import styled from "styled-components";
import { MessageSectionHeader } from "./header";
import { MessageSectionContent } from "./content";

const MessageSectionWrapper = styled.section`
  height: 100%;
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
