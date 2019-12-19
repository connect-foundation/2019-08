import React, { useState } from "react";
import styled, { css } from "styled-components";
import { ProfileThumnail } from "presentation/components/atomic-reusable/profile-thumnail";
import { PostCardContents } from "./post-card-contents";
import { Post } from "core/entity/post";

const PostCardBox = styled.section`
  position: relative;
  width: 100%;
  height: auto;
  display: flex;
  color: ${({ theme }) => theme.snugMainFont};
  &:hover {
    background-color: ${({ theme }) => theme.snugHover};
  }
`;

const MarginBox = styled.section`
  width: 10px;
`;

const ThreadButtonBox = styled.section<propType>`
  position: absolute;
  right: 10%;
  top: -20px;
  ${({ onHover }) => {
    if (onHover === "ture")
      return css`
        display: flex;
        justify-content: center;
        align-items: center;
      `;
  }}
  border : none;
  border-radius: 10px;
  width: auto;
  height: auto;
`;

interface propType {
  onHover: string;
}

export const PostCard: React.FC<Post & {
  toggleThread?: (event: React.MouseEvent) => void;
}> = ({ profile, createdAt, contents, toggleThread, replyCount, filePath }) => {
  const [onHover, setOnHover] = useState("false");

  return (
    <PostCardBox
      onMouseOver={() => {
        setOnHover("true");
      }}
      onMouseLeave={() => {
        setOnHover("false");
      }}
    >
      <MarginBox />
      <ProfileThumnail thumbnail={profile!.thumbnail!}></ProfileThumnail>
      <PostCardContents
        writerName={profile!.name!}
        createdAt={createdAt!}
        contents={contents!}
        toggleThread={toggleThread!}
        replyCount={replyCount!}
        filePath={filePath}
      ></PostCardContents>
      <MarginBox />
    </PostCardBox>
  );
};
