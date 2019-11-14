import React from "react";
import styled from "styled-components";
import { MessageCardImage } from "./message-card-image";
import { MessageCardContents } from "./message-card-contents";

const MessageCardBox = styled.section`
  width: 100%;
  height: auto;
  display: flex;
`;

const MarginBox = styled.section`
  width: 10px;
`;

interface PropTypes {
  imageSrc: string;
  userName: string;
  timestamp: string;
  message: string;
}

export const MessageCard: React.FC<PropTypes> = ({
  imageSrc,
  userName,
  timestamp,
  message
}) => {
  return (
    <MessageCardBox>
      <MarginBox></MarginBox>
      <MessageCardImage imageSrc={imageSrc}></MessageCardImage>
      <MessageCardContents
        userName={userName}
        timestamp={timestamp}
        message={message}
      ></MessageCardContents>
      <MarginBox></MarginBox>
    </MessageCardBox>
  );
};
