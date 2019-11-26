import React from "react";
import styled from "styled-components";
import { ProfileThumnail } from "presentation/components/atomic-reusable/profile-thumnail";
import { PostCardContents } from "./post-card-contents";
import { Post } from "core/entity/post";

const MessageCardBox = styled.section`
  width: 100%;
  height: auto;
  display: flex;
`;

const MarginBox = styled.section`
  width: 10px;
`;

export const PostCard: React.FC<Post> = ({ profile, createdAt, contents }) => {
  return (
    <MessageCardBox>
      <MarginBox />
      <ProfileThumnail thumbnail={profile!.profileThumnail!}></ProfileThumnail>
      <PostCardContents
        writerName={profile!.profileName!}
        createdAt={createdAt!}
        contents={contents!}
      ></PostCardContents>
      <MarginBox />
    </MessageCardBox>
  );
};
