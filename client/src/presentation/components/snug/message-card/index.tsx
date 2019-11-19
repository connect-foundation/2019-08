import React from "react";
import styled from "styled-components";
import { MessageCardImage } from "presentation/components/atomic-reusable/message-card-image";
import { MessageCardContents } from "./message-card-contents";
import { Post } from "core/entity/post";

const MessageCardBox = styled.section`
  width: 100%;
  height: auto;
  display: flex;
`;

const MarginBox = styled.section`
  width: 10px;
`;

export const MessageCard: React.FC<Post> = ({
  profileThumnail,
  profileName,
  createdAt,
  contents
}) => {
  return (
    <MessageCardBox>
      <MarginBox />
      <MessageCardImage imageSrc={profileThumnail}></MessageCardImage>
      <MessageCardContents
        userName={profileName}
        timestamp={createdAt}
        message={contents}
      ></MessageCardContents>
      <MarginBox />
    </MessageCardBox>
  );
};
