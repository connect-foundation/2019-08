import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { Header } from "./header";
import { ThreadInputBox } from "presentation/components/snug/thread-input-box";
import { ThreadContainer } from "presentation/components/snug/thread-container";
import { Post } from "../../../../core/entity/post";
import { globalApplication } from "../../../../contexts/application-context";
import { Thread } from "../../../../core/entity/thread";

const Wrapper = styled.section`
  background-color: ${({ theme }) => theme.snugMenuColor};
  border-left: 1px solid ${({ theme }) => theme.snugBorderColor};
  width: 30%;
  overflow-y: scroll;
  overflow-x: hidden;
  @media (min-width: 800px) {
    min-width: 250px;
  }
  @media (min-width: 1200px) {
    min-width: 300px;
  }
  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: #1d8fc0;
    opacity: 0.4;
  }
  &::-webkit-scrollbar-track {
    background-color: grey;
  }
`;

interface PropTypes {
  thread: number;
  toggleThread(postId: number): void;
}

export const ThreadSection: React.FC<PropTypes> = ({
  thread,
  toggleThread
}) => {
  const application = useContext(globalApplication);
  const [post, setPost] = useState<Post>({});
  const [replies, setReplies] = useState<Post[]>([]);

  useEffect(() => {
    (async () => {
      const {
        post,
        replies
      }: Thread = (await application.services.postService.getReplyList(
        thread
      )) as Thread;
      setPost(post);
      setReplies(replies);
    })();
  }, [thread, application.services.postService]);

  const addReply = (reply: Post) =>
    setReplies(prevState => prevState.concat(reply));
  return (
    <Wrapper>
      <Header toggleThread={toggleThread} />
      <ThreadContainer post={post} replies={replies} />
      <ThreadInputBox addReply={addReply} thread={thread} />
    </Wrapper>
  );
};
