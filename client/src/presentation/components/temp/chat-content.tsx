import React from "react";
import styled from "styled-components";
import { MessageCard } from "./message-card";
import { useMessages } from "../../../contexts/messages-context";
import { Message } from "../../../core/entity/message";
const ChatContentWrapper = styled.section`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  overflow-y: hidden;
`;

export const ChatContent: React.FC = () => {
  let messages: Message[] | null;

  try {
    messages = useMessages();
  } catch (error) {
    alert(error.message);
    messages = null;
  }

  function messageList(): React.ReactNode {
    if (!messages) return <></>;
    return messages!.map(message => (
      <MessageCard
        key={message.id}
        name={message.name}
        imageSrc={message.imageSrc}
        contents={message.contents}
        timestamp={message.timestamp}
      />
    ));
  }

  return <ChatContentWrapper>{messageList()}</ChatContentWrapper>;
};
