import React, {
  useState,
  useEffect,
  useContext,
  forwardRef,
  RefObject
} from "react";
import styled from "styled-components";
import ClipBlack from "assets/clip.png";
import { IconBox } from "presentation/components/atomic-reusable/icon-box";
import { useMessagesDispatch } from "contexts/messages-context";
import { ResponseEntity } from "data/http/api/response/ResponseEntity";
import { Post } from "core/entity/post";
import { usePathParameter } from "contexts/path-parameter-context";
import { globalSocket } from "contexts/socket-context";
import { globalApplication } from "contexts/application-context";
import { AppChannelMatchProps } from "prop-types/match-extends-types";

const MY_TEXT_AREA = "my_text_area";
const TEXT_BOX = "textbox";

const InputWrapper = styled.section.attrs({
  id: "textbox"
})`
  width: 100%;
  height: auto;
  max-height: 200px;
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
  height: auto;
  border-style: solid;
  border-width: 1px;
  border-color: ${({ theme }) => theme.snugBorderColor};
  background-color: ${({ theme }) => theme.snug};
  border-radius: 10px;
  overflow: hidden;
  display: flex;
  padding: 5px;
`;

const StyledInput = styled.textarea.attrs({
  placeholder: "메세지를 입력하세요.",
  id: "my_text_area"
})`
  --webkit-appearance: none;
  background-color: ${({ theme }) => theme.snug};
  font-size: 14px;
  color: ${({ theme }) => theme.snugMainFont};
  width: 100%;
  border: none;
  &:active,
  :focus {
    outline: none;
  }
`;

interface PropType extends AppChannelMatchProps {
  openModal: () => void;
  setHeight: any;
  ref: any;
}

export const ChatInputBox: React.FC<PropType> = forwardRef((props, ref) => {
  const { openModal, setHeight } = props;
  const application = useContext(globalApplication);
  const KEY_PRESS_EVENT_KEY = "Enter";
  const [message, setMessage] = useState("");
  const dispatch = useMessagesDispatch();
  const pathPrameter = usePathParameter();
  const { snugSocket } = useContext(globalSocket);

  const inputChangeEventHandler = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setMessage(event.target.value);
  };

  function resize() {
    const textArea: HTMLElement = document.getElementById(MY_TEXT_AREA)!;
    textArea.style.height = "0px";
    textArea.style.height = textArea.scrollHeight + "px";
    setHeight(document.getElementById(TEXT_BOX)!.clientHeight);
  }

  useEffect(() => {
    snugSocket.off("newPost");
    snugSocket.on("newPost", (resultData: ResponseEntity<Post>) => {
      const { payload } = resultData;
      if (payload.room!.id !== pathPrameter.channelId) return;
      dispatch({
        type: "CREATE",
        id: payload.id!,
        profile: {
          name: payload.profile!.name! || "두부",
          thumbnail: payload.profile!.thumbnail!
        },
        createdAt: payload.createdAt!,
        updatedAt: payload.updatedAt!,
        contents: payload.contents!,
        filePath: payload.filePath!
      });
    });
    setMessage("");
  }, [pathPrameter.channelId, snugSocket, dispatch]);

  //이 부분은 mock 데이터로 되어 있으니 차후 수정이 필요함
  const inputKeyPressEventHandler = async (
    event: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (event.shiftKey) return;
    if (event.key !== KEY_PRESS_EVENT_KEY) return;
    event.preventDefault();
    if (!message.trim()) {
      setMessage("");
      resize();
      return;
    }
    const result = await application.services.postService.createMessage(
      message,
      pathPrameter.channelId!
    );
    if (!result) return;
    setMessage("");
    resize();
    goBottom();
  };

  function goBottom() {
    const obj: HTMLElement = document.getElementById("scroll")!;
    obj.scrollTop = obj.scrollHeight;
  }

  return (
    <InputWrapper
      ref={
        ref as
          | ((instance: HTMLElement | null) => void)
          | RefObject<HTMLElement>
          | null
          | undefined
      }
    >
      <MarginBox></MarginBox>
      <CustomInput>
        <IconBox imageSrc={ClipBlack} onClick={openModal}></IconBox>
        <StyledInput
          value={message}
          onChange={inputChangeEventHandler}
          onKeyPress={inputKeyPressEventHandler}
          onKeyDown={resize}
          onKeyUp={resize}
        ></StyledInput>
      </CustomInput>
      <MarginBox></MarginBox>
    </InputWrapper>
  );
});
