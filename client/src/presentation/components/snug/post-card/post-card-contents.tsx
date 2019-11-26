import React from "react";
import styled from "styled-components";

const MessageBox = styled.section`
  padding: 5px;
  width: 100%;
  height: auto;
`;

const MessageDetail = styled.section`
  width: 100%;
  height: auto;
  padding-top: 5px;
  padding-bottom: 5px;
`;

const MessageDetailUsername = styled.span`
  font-weight: bold;
  font-size: 1rem;
`;

const MessageDetailTimestamp = styled.span`
  font-weight: 500;
  font-size: 0.75rem;
`;

const MessageContents = styled.span`
  word-break: break-all;
  font-weight: 500;
  font-size: 1rem;
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
    <MessageBox>
      <MessageDetail>
        <MessageDetailUsername>{userName}</MessageDetailUsername>
        <MessageDetailTimestamp>{timestamp}</MessageDetailTimestamp>
      </MessageDetail>
      <MessageContents>{message}</MessageContents>
    </MessageBox>
  );
};
