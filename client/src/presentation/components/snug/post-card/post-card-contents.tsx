import React from "react";
import styled from "styled-components";
import Gipyoo from "assets/gipyoo.png";

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
  writerName: string;
  createdAt: string;
  contents: string;
  toggleThread?():void;
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

const Images = styled.section`
  width: 100px;
  display: flex;
  margin: 0 15px;
`;

const ImageIcon = styled.img`
  width: 30px;
  margin-right: 2px;
`;

const ReplyNumber = styled.span`
  display: inline-block;
`;

export const PostCardContents: React.FC<PropTypes> = ({
  writerName: userName,
  createdAt: timestamp,
  contents: message,
  toggleThread
}) => {
  return (
    <PostBox>
      <PostDetail>
        <PostDetailWriterName>{userName}</PostDetailWriterName>
        <PostDetailTimestamp>{timestamp}</PostDetailTimestamp>
      </PostDetail>
      <PostContents>{message}</PostContents>
      <Thread onClick={toggleThread}>
        <Images>
          <ImageIcon src={Gipyoo} />
          <ImageIcon src={Gipyoo} />
          <ImageIcon src={Gipyoo} />
        </Images>
        <ReplyNumber>3 댓글</ReplyNumber>
      </Thread>
    </PostBox>
  );
};
