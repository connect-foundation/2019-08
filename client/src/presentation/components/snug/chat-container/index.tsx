import React, { useEffect, useContext, useState } from "react";
import styled, { css } from "styled-components";
import { useMessages, useMessagesDispatch } from "contexts/messages-context";
import { ChannelRouteComponentType } from "prop-types/channel-match-type";
import { PostCard } from "presentation/components/snug/post-card";
import { Post } from "core/entity/post";
import { usePathParameter } from "contexts/path-parameter-context";
import { globalApplication } from "contexts/application-context";
import Axios from "axios";
import Loader from "react-loader-spinner";

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
  const [done, setDone] = useState<boolean>(false);
  const [isTop, setIsTop] = useState<boolean>(false);

  useEffect(() => {
    if (!pathParameter.channelId) return;

    const source = Axios.CancelToken.source();

    const getPosts = async function() {
      try {
        dispatch({
          type: "CLEAR_ALL"
        });
        const resultPosts = await application.services.postService.getList(
          pathParameter.channelId!,
          source.token
        );
        if (typeof resultPosts === "boolean") return;
        dispatch({
          type: "MULTI_INPUT",
          posts: resultPosts
        });
        const obj: HTMLElement = document.getElementById("scroll")!;
        obj.scrollTop = obj.scrollHeight;
      } catch (error) {
        if (Axios.isCancel(error)) return;
      }
    };

    getPosts();

    return function cleanup() {
      source.cancel();
    };
  }, [pathParameter.channelId, application.services.postService, dispatch]);

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

  const infinityScrollEvent = async () => {
    const obj: HTMLElement = document.getElementById("scroll")!;
    if (obj.scrollTop > 0) return;
    try {
      const postId = posts[0].id;
      const newPosts:
        | Post[]
        | boolean = await application.services.postService.getList(
        pathParameter.channelId!,
        undefined,
        postId
      );
      if (!newPosts || (newPosts as Post[]).length === 0 || isTop) return;
      setIsTop(true);
      let curruentHeight = obj.scrollHeight;
      setTimeout(() => {
        setDone(true);
        setIsTop(false);
        dispatch({
          type: "FRONT_MULTI_INPUT",
          posts: newPosts as Post[]
        });
        setDone(false);
        obj.scrollTop = obj.scrollHeight - curruentHeight;
      }, 300);
    } catch (error) {
      return;
    }
  };

  return (
    <ChatContentWrapper
      isParticipated={isParticipated}
      height={height}
      onScroll={infinityScrollEvent}
    >
      <Wrapper>
        {done === false && isTop === true ? (
          <LoaderWrpper>
            <Loader type="Watch" color="#000" height={30} width={30} />
          </LoaderWrpper>
        ) : null}
        {messageList()}
      </Wrapper>
    </ChatContentWrapper>
  );
};

const LoaderWrpper = styled.section`
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
