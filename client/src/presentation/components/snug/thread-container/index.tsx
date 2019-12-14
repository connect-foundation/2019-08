import React, { useEffect, useContext } from "react";
import styled, { css } from "styled-components";
import { useMessages, useMessagesDispatch } from "contexts/messages-context";
import { ChannelRouteComponentType } from "prop-types/channel-match-type";
import { PostCard } from "presentation/components/snug/post-card";
import { Post } from "core/entity/post";
import { usePathParameter } from "contexts/path-parameter-context";
import { globalApplication } from "contexts/application-context";
import { Profile } from "core/entity/profile";

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

export const ThreadContainer: React.FC = () => {
  // const { isParticipated } = props;
  // const application = useContext(globalApplication);
  // const posts: Post[] = useMessages();
  // const dispatch = useMessagesDispatch();
  // const pathParameter = usePathParameter();

  // useEffect(() => {
  //   (async function() {
  //     dispatch({
  //       type: "CLEAR_ALL"
  //     });
  //     const resultPosts = await application.services.postService.getList(
  //       pathParameter.channelId!
  //     );
  //     if (typeof resultPosts == "boolean") return;
  //     dispatch({
  //       type: "MULTI_INPUT",
  //       posts: resultPosts
  //     });
  //   })();
  // }, [pathParameter]);

  // useEffect(() => {
  //   const obj: HTMLElement = document.getElementById("scroll")!;
  //   obj.scrollTop = obj.scrollHeight;
  // }, [posts]);

  // function messageList(): React.ReactNode {
  //   if (!posts) return <></>;
  //   return posts!.map((post: Post) => (
  //     <PostCard
  //       key={post.id!}
  //       profile={post.profile}
  //       contents={post.contents!}
  //       createdAt={post.createdAt!}
  //       updatedAt={post.updatedAt!}
  //     />
  //   ));
  // }

  const profile = {
    id: 1,
    thumbnail: "/image/default-thumbnail.jpeg",
    name: "야한남자",
    status: "야하고 싶다",
    role: "admin",
    snugId: 1
  } as Profile;
  return (
    <ChatContentWrapper>
      <Wrapper>
        <PostCard
          key={1}
          profile={profile}
          createdAt={Date.now().toString()}
          updatedAt={Date.now().toString()}
          contents={"빨리 집가고 싶다."}
        />
        <PostCard
          key={1}
          profile={profile}
          createdAt={Date.now().toString()}
          updatedAt={Date.now().toString()}
          contents={"빨리 집가고 싶다."}
        />
        <PostCard
          key={1}
          profile={profile}
          createdAt={Date.now().toString()}
          updatedAt={Date.now().toString()}
          contents={"빨리 집가고 싶다."}
        />
        <PostCard
          key={1}
          profile={profile}
          createdAt={Date.now().toString()}
          updatedAt={Date.now().toString()}
          contents={"빨리 집가고 싶다."}
        />
      </Wrapper>
    </ChatContentWrapper>
  );
};
