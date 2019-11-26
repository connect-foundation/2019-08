import React from "react";
import styled from "styled-components";

const PostBox = styled.section`
  padding: 5px;
  width: 100%;
  height: auto;
  font-weight: 500;
  font-size: 1rem;
`;

const PostDetail = styled.section`
  width: 100%;
  height: auto;
  padding-top: 5px;
  padding-bottom: 5px;
`;

const PostDetailWriterName = styled.span`
  font-weight: bold;
`;

const PostDetailTimestamp = styled.span`
  font-size: 0.75rem;
`;

const PostContents = styled.span`
  word-break: break-all;
  padding-top: 5px;
  padding-bottom: 5px;
`;

interface PropTypes {
  userName: string;
  createdAt: string;
  contents: string;
}

export const PostCardContents: React.FC<PropTypes> = ({
  userName,
  createdAt: timestamp,
  contents: message
}) => {
  return (
    <PostBox>
      <PostDetail>
        <PostDetailWriterName>{userName}</PostDetailWriterName>
        <PostDetailTimestamp>{timestamp}</PostDetailTimestamp>
      </PostDetail>
      <PostContents>{message}</PostContents>
    </PostBox>
  );
};
