import React, { useState } from "react";
import styled from "styled-components";
import { ChatContent } from "presentation/components/snug/chat-container";
import { ChatInputBox } from "presentation/components/snug/chat-input-box";
import { MessageContextProvider } from "contexts/messages-context";
import { AppChannelMatchProps } from "prop-types/match-extends-types";
import { FileUploadModal } from "presentation/components/snug/file-upload-modal";

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
