import React, { useEffect } from "react";
import styled from "styled-components";
import { useMessages, useMessagesDispatch } from "contexts/messages-context";
import { AppSocketChannelMatchProps } from "prop-types/match-extends-types";
import { PostCard } from "presentation/components/snug/post-card";

const ChatContentWrapper = styled.section`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  overflow-y: hidden;
`;

export const ChatContent: React.FC<AppSocketChannelMatchProps> = props => {
  const messages = useMessages();
  const dispatch = useMessagesDispatch();
  const { socket } = props;

  useEffect(() => {
    socket.on("sendMessage", (obj: Message) => {
      dispatch({
        type: "CREATE",
        id: obj.id!,
        name: obj.name,
        imageSrc: obj.imageSrc,
        timestamp: obj.timestamp,
        contents: obj.contents
      });
    });
  });

  function messageList(): React.ReactNode {
    if (!messages) return <></>;
    return messages!.map(message => (
      <PostCard
        key={message.id}
        profileName={message.profileName}
        profileThumnail={message.profileThumnail}
        contents={message.contents}
        createdAt={message.createdAt}
        updatedAt={message.updatedAt}
      />
    ));
  }

  return <ChatContentWrapper>{messageList()}</ChatContentWrapper>;
};
