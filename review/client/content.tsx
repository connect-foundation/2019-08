import React, { useState } from "react";
import styled from "styled-components";
import { ChatInputBox } from "./chat-input-box";
import { FileUploadModal } from "./file-upload-modal";

const MessageSectionContentWrapper = styled.section`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.snug};
  display: flex;
  flex-direction: column;
  overflow: auto;
`;

export const MessageSectionContent: React.FC<AppChannelMatchProps> = props => {
  // file upload 모달
  // modal state 관리하는 함수 전달
  // file input changed 발생시 modal 활성화
  const [onModal, setModal] = useState(false);

  const openModal = () => {
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
  };

  // 파일 내용 state
  return (
    <MessageContextProvider>
      {onModal && <FileUploadModal closeModal={closeModal} />}
      <MessageSectionContentWrapper>
        <ChatContent {...props} />
        <ChatInputBox {...props} openModal={openModal} />
      </MessageSectionContentWrapper>
    </MessageContextProvider>
  );
};
