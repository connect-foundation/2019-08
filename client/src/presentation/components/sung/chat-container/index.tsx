import React from "react";
import styled from "styled-components";

const ChatContentWrapper = styled.section`
  height: 100%;
  width: 100%;
`;

export const ChatContent: React.FC = () => {
  return <ChatContentWrapper>채팅</ChatContentWrapper>;
};
