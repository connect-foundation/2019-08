import React from "react";
import styled from "styled-components";
import { PostCard } from "presentation/components/snug/post-card";
import { Post } from "core/entity/post";

const ChatContentWrapper = styled.section.attrs({})`
  min-height: calc(100% - 150px);
  width: 300px;
  display: flex;
  flex-flow: column nowrap;
`;

const WrapperPost = styled.section.attrs({})`
  margin-bottom: auto !important;
`;

const WrapperPostCard = styled.section.attrs({})`
  margin-bottom: 20px;
  border-bottom: 1px solid ${({ theme }) => theme.snugBorderColor};
`;

const WrapperMessages = styled.section.attrs({})`
  margin-top: auto !important;
`;

interface PropTypes {
  post: Post;
  replies: Post[];
}

export const ThreadContainer: React.FC<PropTypes> = ({ post, replies }) => {
  function messagePost(): React.ReactNode {
    if (Object.keys(post).length <= 0) return <></>;
    return (
      <PostCard
        key={post.id!}
        profile={post.profile}
        contents={post.contents!}
        createdAt={post.createdAt!}
        updatedAt={post.updatedAt!}
      />
    );
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
      <WrapperPost>
        <WrapperPostCard>{messagePost()}</WrapperPostCard>
      </WrapperPost>
      <WrapperMessages>{messageList()}</WrapperMessages>
    </ChatContentWrapper>
  );
};
