import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { ChatContent } from "presentation/components/snug/chat-container";
import { ChatInputBox } from "presentation/components/snug/chat-input-box";
import { MessageContextProvider } from "contexts/messages-context";
import { Preview } from "presentation/components/snug/preview";
import { AppChannelMatchProps } from "prop-types/match-extends-types";
import { FileUploadModal } from "presentation/components/snug/file-upload-modal";
import { usePathParameter } from "contexts/path-parameter-context";

const MessageSectionContentWrapper = styled.section`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.snug};
  display: flex;
  flex-direction: column;
  overflow: auto;
`;

export const MessageSectionContent: React.FC<AppChannelMatchProps> = props => {
  const { Application, history } = props;
  const [isParticipated, setIsParticipated] = useState(false);
  const pathParameter = usePathParameter();
  // file upload 모달
  // modal state 관리하는 함수 전달
  // file input changed 발생시 modal 활성화
  const [onModal, setModal] = useState(false);

  useEffect(() => {
    isInParticipating();
  }, [pathParameter]);

  const isInParticipating = async () => {
    try {
      const result = await Application.services.channelService.isInParticipating(
        pathParameter.channelId!
      );
      console.log(result);
      setIsParticipated(result);
    } catch (error) {
      console.log(error);
    }
  };

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
        <ChatContent {...props} isParticipated={isParticipated} />
        {isParticipated ? (
          <ChatInputBox {...props} openModal={openModal} />
        ) : (
          <Preview {...props} setIsParticipated={setIsParticipated}></Preview>
        )}
      </MessageSectionContentWrapper>
    </MessageContextProvider>
  );
};
