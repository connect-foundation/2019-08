import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { ChatContent } from "presentation/components/snug/chat-container";
import { ChatInputBox } from "presentation/components/snug/chat-input-box";
import { MessageContextProvider } from "contexts/messages-context";
import { ProfileSection } from "presentation/pages/snug/profile";
import LeftArrow from "assets/left-arrow.png";
import RightArrow from "assets/right-arrow.png";
import { Preview } from "presentation/components/snug/preview-channel";
import { AppChannelMatchProps } from "prop-types/match-extends-types";
import { FileUploadModal } from "presentation/components/snug/file-upload-modal";
import { usePathParameter } from "contexts/path-parameter-context";
import { ThreadSection } from "presentation/pages/snug/thread";
import axios from "axios";
import Axios from "axios";

const MessageSectionContentWrapper = styled.section`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.snug};
  display: flex;
  flex-direction: column;
  overflow: auto;
`;

const Wrapper = styled.section`
  display: flex;
  justify-content: space-between;
  height: calc(100% - 50px);
  width: 100%;
`;

const ToggleButton = styled.button`
  height: 40px;
  width: 40px;
  border-bottom-left-radius: 30px;
  border-top-left-radius: 30px;
  background-color: #ffffff;
  color: #000000;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  text-align: center;
  font-weight: 900;
  font-size: 1.6rem;
  position: fixed;
  top: 50%;
  right: 0;
  transform: translateX(25%);
  z-index: 5;
  &:active,
  :focus {
    outline: none;
  }
`;

export const MessageSectionContent: React.FC<AppChannelMatchProps> = props => {
  const [toggleProfile, setToggleProfile] = useState(false);
  const inputRef = useRef<HTMLElement>();
  const [onThread, setOnThread] = useState<boolean>(false);
  const [thread, setThread] = useState(0);
  const [height, setHeight] = useState(82);
  const handleClick = () => {
    setToggleProfile(!toggleProfile);
  };

  const toggleThread = (postId: number) => {
    setThread(postId);
    setOnThread(!onThread);
  };

  const resetThread = (postId: number) => {
    setThread(postId);
  };

  const resetOnThread = (onThread: boolean) => {
    setOnThread(onThread);
  };

  const { Application } = props;
  const [isParticipated, setIsParticipated] = useState(false);
  const pathParameter = usePathParameter();
  const [onModal, setModal] = useState(false);

  useEffect(() => {
    if (inputRef.current) {
      setHeight(inputRef.current!.clientHeight);
    }
  }, [pathParameter.channelId]);

  useEffect(() => {
    if (!pathParameter.snugId || !pathParameter.channelId) return;
    const source = axios.CancelToken.source();
    (async () => {
      try {
        const result = await Application.services.channelService.isInParticipating(
          pathParameter.snugId!,
          pathParameter.channelId!,
          source.token
        );
        setIsParticipated(result);
      } catch (error) {
        if (Axios.isCancel(error)) return;
      }
    })();

    return function cleanup() {
      source.cancel();
    };
  }, [
    pathParameter.channelId,
    Application.services.channelService,
    pathParameter.snugId
  ]);

  useEffect(() => {
    resetOnThread(false);
  }, [pathParameter]);

  const openModal = () => {
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
  };

  // 파일 내용 state
  return (
    <MessageContextProvider>
      <Wrapper>
        {onModal && <FileUploadModal closeModal={closeModal} />}
        <MessageSectionContentWrapper>
          <ChatContent
            {...props}
            isParticipated={isParticipated}
            toggleThread={toggleThread}
            onThread={onThread}
            resetThread={resetThread}
            height={height}
          />
          {isParticipated ? (
            <ChatInputBox
              {...props}
              openModal={openModal}
              setHeight={setHeight}
              ref={inputRef}
            />
          ) : (
            <Preview {...props} setIsParticipated={setIsParticipated}/>
          )}
        </MessageSectionContentWrapper>
        <ToggleButton onClick={handleClick}>
          {toggleProfile ? (
              <StyledImg src={RightArrow} />
          ) : (
            <StyledImg src={LeftArrow} />
          )}
        </ToggleButton>
        {onThread && (
          <ThreadSection thread={thread} toggleThread={toggleThread} />
        )}
        <ProfileSection {...props} toggleProfile={toggleProfile} />
      </Wrapper>
    </MessageContextProvider>
  );
};

const StyledImg = styled.img`
  width: 1rem;
  height: 1rem;
`;
