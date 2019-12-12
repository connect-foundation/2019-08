import React from "react";
import styled from "styled-components";
import { MessageSectionHeader } from "./header";
import { MessageSectionContent } from "./content";
import { AppChannelMatchProps } from "prop-types/match-extends-types";

const MessageSectionWrapper = styled.section`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const MessageSection: React.FC<AppChannelMatchProps> = props => {
  return (
    <MessageSectionWrapper>
      <MessageSectionHeader></MessageSectionHeader>
      <MessageSectionContent {...props}></MessageSectionContent>
    </MessageSectionWrapper>
  );
};
