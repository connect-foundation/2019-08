import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ClipWhite from "assets/clip-white.png";
import AtWhite from "assets/at-white.png";
import FaceWhite from "assets/face-white.png";
import { IconBox } from "presentation/components/atomic-reusable/icon-box";
import { useMessagesDispatch, useMessages } from "contexts/messages-context";
import dubu from "assets/dubu.png";
import { AppSocketChannelMatchProps } from "prop-types/match-extends-types";
import { ResponseEntity } from "data/http/api/response/ResponseEntity";
import { Post } from "core/entity/post";
import { usePathParameter } from "contexts/path-parameter-context";
const InputWrapper = styled.section`
  width: 100%;
  height: 75px;
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

export const ChatInputBox: React.FC<AppSocketChannelMatchProps> = ({
  Application,
  socket
}) => {
  const KEY_PRESS_EVENT_KEY = "Enter";
  const [message, setMessage] = useState("");
  const [id, setId] = useState(0);
  const messages = useMessages();
  const dispatch = useMessagesDispatch();
  const pathPrameter = usePathParameter();
  const inputChangeEventHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setMessage(event.target.value);
  };

  useEffect(() => {
    socket.on("newPost", (resultData: ResponseEntity<Post>) => {
      console.log("(성공)");
      const { payload } = resultData;
      dispatch({
        type: "CREATE",
        id: payload.id!,
        profile: {
          name: payload.profile!.name! || "두부",
          thumbnail: dubu
        },
        createdAt: payload.createdAt!,
        updatedAt: payload.updatedAt!,
        contents: payload.contents!
      });
    });
  }, []);

  //이 부분은 mock 데이터로 되어 있으니 차후 수정이 필요함
  const inputKeyPressEventHandler = async (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    event.stopPropagation();
    if (event.key !== KEY_PRESS_EVENT_KEY) return;
    if (!message.trim()) return;
    if (!dispatch) return;

    const result = await Application.services.postService.createMessage(
      1,
      message,
      pathPrameter.channelId
    );
    if (!result) return;
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
        <IconBox imageSrc={AtWhite}></IconBox>
        <IconBox imageSrc={FaceWhite}></IconBox>
      </CustomInput>
      <MarginBox></MarginBox>
    </InputWrapper>
  );
};
