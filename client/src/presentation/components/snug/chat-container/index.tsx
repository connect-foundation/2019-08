import React, { useEffect, useContext } from "react";
import styled, { css } from "styled-components";
import { useMessages, useMessagesDispatch } from "contexts/messages-context";
import { ChannelRouteComponentType } from "prop-types/channel-match-type";
import { PostCard } from "presentation/components/snug/post-card";
import { Post } from "core/entity/post";
import { usePathParameter } from "contexts/path-parameter-context";
import { globalApplication } from "contexts/application-context";

const ChatContentWrapper = styled.section.attrs({
  id: "scroll"
})<{ isParticipated: boolean; height: number }>`
  min-height: ${({ isParticipated, height }) =>
    isParticipated ? css`calc(100% - ${height}px)` : css`calc(100% - 150px)`};
  max-height: ${({ isParticipated, height }) =>
    isParticipated ? css`calc(100% - ${height}px)` : css`calc(100% - 150px)`};
  width: 100%;
  overflow-y: auto;
  display: flex;
  flex-flow: column nowrap;
`;

const Wrapper = styled.section.attrs({})`
  margin-top: auto !important;
`;

export const ChatContent: React.FC<ChannelRouteComponentType & {
  isParticipated: boolean;
  toggleThread: (postId: number) => void;
  onThread: boolean;
  resetThread: (postId: number) => void;
  height: number;
}> = props => {
  const { isParticipated, toggleThread, onThread, resetThread, height } = props;
  const application = useContext(globalApplication);
  const posts: Post[] = useMessages();
  const dispatch = useMessagesDispatch();
  const pathParameter = usePathParameter();

  useEffect(() => {
    (async function() {
      dispatch({
        type: "CLEAR_ALL"
      });
      const resultPosts = await application.services.postService.getList(
        pathParameter.channelId!
      );
      if (typeof resultPosts === "boolean") return;
      dispatch({
        type: "MULTI_INPUT",
        posts: resultPosts
      });
    })();
  }, [pathParameter.channelId, application.services.postService, dispatch]);

  useEffect(() => {
    const obj: HTMLElement = document.getElementById("scroll")!;
    obj.scrollTop = obj.scrollHeight;
  }, [posts]);

  // thread개수 정하는 logic추가
  function messageList(): React.ReactNode {
    if (!posts) return <></>;
    return posts!.map((post: Post) => (
      <PostCard
        key={post.id!}
        profile={post.profile}
        contents={post.contents!}
        replyCount={post.replyCount!}
        createdAt={post.createdAt!}
        updatedAt={post.updatedAt!}
        filePath={post.filePath}
        toggleThread={() =>
          onThread ? resetThread(post.id!) : toggleThread(post.id!)
        }
      />
    ));
  }

  return (
    <ChatContentWrapper isParticipated={isParticipated} height={height}>
      <Wrapper>{messageList()}</Wrapper>
    </ChatContentWrapper>
  );
};
