import React from "react";
import styled, { css } from "styled-components";
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
      <ProfileThumnail imageSrc={profile!.profileThumnail!}></ProfileThumnail>
      <PostCardContents
        userName={profile!.profileName!}
        timestamp={createdAt!}
        message={contents!}
      ></PostCardContents>
      <MarginBox />
    </MessageCardBox>
  );
};
