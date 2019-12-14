import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import ClipWhite from "assets/clip-white.png";
import AtWhite from "assets/at-white.png";
import FaceWhite from "assets/face-white.png";
import { IconBox } from "presentation/components/atomic-reusable/icon-box";
import { useMessagesDispatch, useMessages } from "contexts/messages-context";
import dubu from "assets/dubu.png";
import { ResponseEntity } from "data/http/api/response/ResponseEntity";
import { Post } from "core/entity/post";
import { usePathParameter } from "contexts/path-parameter-context";
import { globalSocket } from "contexts/socket-context";
import { globalApplication } from "contexts/application-context";
import { AppChannelMatchProps } from "prop-types/match-extends-types";

const InputWrapper = styled.section`
  width: 100%;
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
  padding: 5px;
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

export const ThreadInputBox: React.FC = props => {
  const KEY_PRESS_EVENT_KEY = "Enter";
  const [message, setMessage] = useState("");
  const [id, setId] = useState(0);
  const dispatch = useMessagesDispatch();
  const pathPrameter = usePathParameter();
  const { snugSocket } = useContext(globalSocket);

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

    // const result = await application.services.postService.createMessage(
    //   1,
    //   message,
    //   pathPrameter.channelId!
    // );
    //if (!result) return;
    setId(id + 1);
    setMessage("");
  };

  return (
    <InputWrapper>
      <MarginBox></MarginBox>
      <CustomInput>
        <IconBox imageSrc={ClipWhite}></IconBox>
        <StyledInput
          value={message}
          onChange={inputChangeEventHandler}
          onKeyPress={inputKeyPressEventHandler}
        ></StyledInput>
      </CustomInput>
      <MarginBox></MarginBox>
    </InputWrapper>
  );
};
