import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import ClipBlack from "assets/clip.png";
import { IconBox } from "presentation/components/atomic-reusable/icon-box";
import { useMessages, useMessagesDispatch } from "contexts/messages-context";
import { ResponseEntity } from "data/http/api/response/ResponseEntity";
import { Post } from "core/entity/post";
import { usePathParameter } from "contexts/path-parameter-context";
import { globalSocket } from "contexts/socket-context";
import { globalApplication } from "contexts/application-context";

const InputWrapper = styled.section`
  width: 400px;
  max-width: 400px;
  min-height: 75px;
  max-height: 75px;
  background-color: ${({ theme }) => theme.snug};
  padding-top: 10px;
  padding-bottom: 20px;
  box-sizing: border-box;
  text-align: center;
  display: flex;
`;

const MarginBox = styled.section`
  min-width: 10px;
  height: 100%;
`;

const CustomInput = styled.section`
  width: 100%;
  border-style: solid;
  border-width: 1px;
  border-color: ${({ theme }) => theme.snugBorderColor};
  background-color: ${({ theme }) => theme.snug};
  border-radius: 10px;
  overflow: hidden;
  display: flex;
  align-items: center;
`;

const StyledInput = styled.input.attrs({
  placeholder: "메세지를 입력하세요."
})`
  --webkit-appearance: none;
  background-color: ${({ theme }) => theme.snug};
  font-size: 14px;
  color: #e3e3e3;
  width: 100%;
  border: none;
  &:active,
  :focus {
    outline: none;
  }
`;

interface PropTypes {
  addReply(reply: Post): void;
  thread: number;
}

const isReplyOnPost = (postId: number, reply: any): boolean => {
  return Number(postId) === reply.parent.id;
};

export const ThreadInputBox: React.FC<PropTypes> = ({ addReply, thread }) => {
  const KEY_PRESS_EVENT_KEY = "Enter";
  const [message, setMessage] = useState("");
  const [id, setId] = useState(0);
  const posts: Post[] = useMessages();
  const dispatch = useMessagesDispatch();
  const pathParameter = usePathParameter();
  const { snugSocket } = useContext(globalSocket);
  const application = useContext(globalApplication);

  useEffect(() => {
    snugSocket.off("replyPost");
    snugSocket.on("replyPost", (resultData: ResponseEntity<any>) => {
      const { payload } = resultData;
      const targetPostIndex = posts.findIndex(post => isReplyOnPost(Number(post.id), payload));
      if(targetPostIndex === -1) return;
      if(isReplyOnPost(Number(thread), payload)) {
        addReply(payload);
      }

      const targetPost = posts[targetPostIndex];
      const replyCount = Number(targetPost.replyCount) || 0;
      targetPost.replyCount = (replyCount + 1).toString();
      posts[targetPostIndex] = { ...targetPost };
      dispatch({
        type: "UPDATE_REPLYCOUNT",
        posts: [...posts]
      });
    });
  }, [pathParameter, dispatch, snugSocket, addReply, posts, thread]);

  const inputChangeEventHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setMessage(event.target.value);
  };

  const inputKeyPressEventHandler = async (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    event.stopPropagation();
    if (event.key !== KEY_PRESS_EVENT_KEY) return;
    if (!message.trim()) return;
    if (!dispatch) return;

    const result = await application.services.postService.reply(
      message,
      pathParameter.channelId!,
      thread
    );
    if (!result) return;
    setId(id + 1);
    setMessage("");
  };

  return (
    <InputWrapper>
      <MarginBox/>
      <CustomInput>
        <IconBox imageSrc={ClipBlack}/>
        <StyledInput
          value={message}
          onChange={inputChangeEventHandler}
          onKeyPress={inputKeyPressEventHandler}/>
      </CustomInput>
      <MarginBox/>
    </InputWrapper>
  );
};
