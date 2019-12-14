import React, {useEffect, useContext, useState} from "react";
import styled, { css } from "styled-components";
import { useMessages, useMessagesDispatch } from "contexts/messages-context";
import { ChannelRouteComponentType } from "prop-types/channel-match-type";
import { PostCard } from "presentation/components/snug/post-card";
import { Post } from "core/entity/post";
import { usePathParameter } from "contexts/path-parameter-context";
import { globalApplication } from "contexts/application-context";
import { Profile } from "core/entity/profile";
import {Thread} from "../../../../core/entity/thread";

// const ChatContentWrapper = styled.section.attrs({
//   id: "scroll"
// })<{ isParticipated: boolean }>`
//   min-height: ${({ isParticipated }) =>
//     isParticipated ? css`calc(100% - 75px)` : css`calc(100% - 150px)`};
//   max-height: ${({ isParticipated }) =>
//     isParticipated ? css`calc(100% - 75px)` : css`calc(100% - 150px)`};
//   width: 100%;
//   overflow-y: auto;
//   display: flex;
//   flex-flow: column nowrap;
// `;
const ChatContentWrapper = styled.section.attrs({})`
  min-height: calc(100% - 150px);
  width: 100%;
  overflow-y: auto;
  display: flex;
  flex-flow: column nowrap;
`;

const Wrapper = styled.section.attrs({})`
  margin-top: auto !important;
`;

interface PropTypes {
  thread: number;
  post: Post;
  replies: Post[];
}

export const ThreadContainer: React.FC<PropTypes> = ({thread, post, replies}) => {
  const application = useContext(globalApplication);
  // const posts: Post[] = useMessages();
  // const dispatch = useMessagesDispatch();
  // const pathParameter = usePathParameter();

  function messagePost(): React.ReactNode {
    if (Object.keys(post).length <= 0 ) return <></>;
    return <PostCard
            key={post.id!}
            profile={post.profile}
            contents={post.contents!}
            createdAt={post.createdAt!}
            updatedAt={post.updatedAt!}/>
  }

  function messageList(): React.ReactNode {
    if (!replies) return <></>;
    return replies!.map((reply: Post) => (
      <PostCard
        key={reply.id!}
        profile={reply.profile}
        contents={reply.contents!}
        createdAt={reply.createdAt!}
        updatedAt={reply.updatedAt!}
      />
    ));
  }
  return (
    <ChatContentWrapper>
      <Wrapper>
        {messagePost()}
        {messageList()}
      </Wrapper>
    </ChatContentWrapper>
  );
};
