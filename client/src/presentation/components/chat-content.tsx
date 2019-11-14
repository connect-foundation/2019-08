import React from "react";
import styled from "styled-components";
import { MessageCard } from "./message-card";
import { useMessages } from "../../contexts/messagesContext";

const ChatContentWrapper = styled.section`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  overflow-y: hidden;
`;

export const ChatContent: React.FC = () => {
  const messages = useMessages();
  return (
    <ChatContentWrapper>
      {messages.map(message => (
        <MessageCard
          key={message.id}
          name={message.name}
          imageSrc={message.imageSrc}
          contents={message.contents}
          timestamp={message.timestamp}
        />
      ))}
    </ChatContentWrapper>
  );
};
