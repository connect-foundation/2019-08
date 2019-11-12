import React from "react";
import styled from "styled-components";
import { Sidebar } from "../components/sidebar";
import { SnugHeader } from "../components/snug-header";
import { MessageSection } from "../components/message-section";
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
      <SnugHeader></SnugHeader>
      <ViewWrapper>
        <Sidebar></Sidebar>
        <MessageSection></MessageSection>
      </ViewWrapper>
    </SnugWrapper>
  );
};
