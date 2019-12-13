import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import ClipWhite from "assets/clip-white.png";
import AtWhite from "assets/at-white.png";
import FaceWhite from "assets/face-white.png";
import { IconBox } from "presentation/components/atomic-reusable/icon-box";
import { useMessagesDispatch, useMessages } from "contexts/messages-context";
import dubu from "assets/dubu.png";
import { AppChannelMatchProps } from "prop-types/match-extends-types";
import { ResponseEntity } from "data/http/api/response/ResponseEntity";
import { Post } from "core/entity/post";
import { usePathParameter } from "contexts/path-parameter-context";
import { globalSocket } from "contexts/socket-context";

interface PropType extends AppChannelMatchProps {
  openModal: () => void;
}

export const ChatInputBox: React.FC<PropType> = props => {
  const { Application, openModal } = props;

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

  useEffect(() => {
    snugSocket.off("newPost");
    snugSocket.on("newPost", (resultData: ResponseEntity<Post>) => {
      const { payload } = resultData;
      if (payload.room != pathPrameter.channelId) return;
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
  }, [pathPrameter]);

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
      pathPrameter.channelId!
    );
    if (!result) return;
    setId(id + 1);
    setMessage("");
  };

  return (
    <InputWrapper>
      <MarginBox></MarginBox>
      <CustomInput>
        <IconBox imageSrc={ClipWhite} onClick={openModal}></IconBox>
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
