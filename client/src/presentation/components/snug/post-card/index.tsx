import React from "react";
import styled from "styled-components";
import { ProfileThumnail } from "presentation/components/atomic-reusable/profile-thumnail";
import { PostCardContents } from "./post-card-contents";
import { Post } from "core/entity/post";

const PostCardBox = styled.section`
  width: 100%;
  height: auto;
  display: flex;
  color: ${({ theme }) => theme.snugMainFont};
`;

const MarginBox = styled.section`
  width: 10px;
`;

export const PostCard: React.FC<Post & {
  toggleThread?: () => void;
}> = ({ profile, createdAt, contents, toggleThread }) => {
  return (
    <PostCardBox>
      <MarginBox />
      <ProfileThumnail thumbnail={profile!.thumbnail!}></ProfileThumnail>
      <PostCardContents
        writerName={profile!.name!}
        createdAt={createdAt!}
        contents={contents!}
        toggleThread={toggleThread!}
      ></PostCardContents>
      <MarginBox />
    </PostCardBox>
  );
};
