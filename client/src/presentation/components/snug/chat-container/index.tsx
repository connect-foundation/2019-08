import React, { useEffect } from "react";
import styled from "styled-components";
import { useMessages, useMessagesDispatch } from "contexts/messages-context";
import { AppSocketChannelMatchProps } from "prop-types/match-extends-types";
import { PostCard } from "presentation/components/snug/post-card";
import { Post } from "core/entity/post";
import { usePathParameter } from "contexts/path-parameter";

const ChatContentWrapper = styled.section`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  overflow-y: hidden;
`;

export const ChatContent: React.FC<AppSocketChannelMatchProps> = props => {
  const { Application } = props;
  const posts: Post[] = useMessages();
  const dispatch = useMessagesDispatch();
  const { socket } = props;
  const pathParameter = usePathParameter();

  useEffect(() => {
    dispatch({
      type: "CLEAR"
    });

    (async function() {
      const resultPosts = await Application.services.postService.getList(
        pathParameter.channelId
      );
      if (typeof resultPosts == "boolean") return;
      dispatch({
        type: "MULTI",
        posts: resultPosts
      });
    })();

    console.log(posts);
  }, [pathParameter]);

  function messageList(): React.ReactNode {
    if (!posts) return <></>;
    return posts!.map((post: Post) => (
      <PostCard
        key={post.id!}
        profile={post.profile}
        contents={post.contents!}
        createdAt={post.createdAt!}
        updatedAt={post.updatedAt!}
      />
    ));
  }

  return <ChatContentWrapper>{messageList()}</ChatContentWrapper>;
};
