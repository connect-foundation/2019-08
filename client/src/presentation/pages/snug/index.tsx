import React from "react";
import styled from "styled-components";
import { Sidebar } from "./sidebar";
import { SnugHeader } from "./header";
import { MessageSection } from "./message-section";

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
