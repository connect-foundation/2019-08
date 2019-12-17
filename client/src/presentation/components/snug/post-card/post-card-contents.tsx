import React from "react";
import styled from "styled-components";
import { FileContents } from "./file-contents";

const PostBox = styled.section`
  width: 100%;
  height: auto;
  font-weight: 500;
  font-size: 1rem;
  cursor: pointer;
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
  writerName: string;
  createdAt: string;
  contents: string;
  replyCount: string;
  toggleThread?(event: React.MouseEvent): void;
}

const Thread = styled.div`
  color: white;
  display: flex;
  align-items: center;
  width: 70%;
  border: 1px solid ${({ theme }) => theme.snugMenuColor};
  transition: 400ms;
  box-sizing: border-box;
  &:hover {
    border: 1px solid white;
    cursor: pointer;
  }
`;

const ReplyNumber = styled.span`
  display: inline-block;
`;

export const PostCardContents: React.FC<PropTypes> = ({
  writerName: userName,
  createdAt: timestamp,
  contents: message,
  replyCount,
  toggleThread,
  filePath
}) => {
  return (
    <PostBox onClick={toggleThread}>
      <PostDetail>
        <PostDetailWriterName>{userName}</PostDetailWriterName>
        <PostDetailTimestamp>{timestamp}</PostDetailTimestamp>
      </PostDetail>
      <PostContents>{message}</PostContents>
      {filePath && <FileContents filePath={filePath}></FileContents>}
      {parseInt(replyCount) > 0 && (
        <Thread>
          <ReplyNumber>{replyCount} 댓글</ReplyNumber>
        </Thread>
      )}
    </PostBox>
  );
};

interface PropTypes {
  writerName: string;
  createdAt: string;
  contents: string;
  replyCount: string;
  toggleThread?(event: React.MouseEvent): void;
  filePath?: string;
}
