import React from "react";
import styled from "styled-components";
import { MessageCardImage } from "presentation/components/atomic-reusable/message-card-image";
import { MessageCardContents } from "./message-card-contents";
import { Message } from "core/entity/message";

const MessageCardBox = styled.section`
  width: 100%;
  height: auto;
  display: flex;
`;

const MarginBox = styled.section`
  width: 10px;
`;

export const MessageCard: React.FC<Message> = ({
  imageSrc,
  name,
  timestamp,
  contents
}) => {
  return (
    <MessageCardBox>
      <MarginBox />
      <MessageCardImage imageSrc={imageSrc}></MessageCardImage>
      <MessageCardContents
        userName={name}
        timestamp={timestamp}
        message={contents}
      ></MessageCardContents>
      <MarginBox />
    </MessageCardBox>
  );
};
