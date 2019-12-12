import React, { useState } from "react";
import styled from "styled-components";
import { ChatContent } from "presentation/components/snug/chat-container";
import { ChatInputBox } from "presentation/components/snug/chat-input-box";
import { MessageContextProvider } from "contexts/messages-context";
import { ProfileSection } from "presentation/pages/snug/profile";
import { ChannelRouteComponentType } from "prop-types/channel-match-type";
import { IconBox } from "presentation/components/atomic-reusable/icon-box";
import LeftArrow from "assets/left-arrow.png";
import RightArrow from "assets/right-arrow.png";

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
  height: 100%;
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
  text-align: center;
  font-weight: 900;
  font-size: 1.6rem;
  position: fixed;
  top: 50%;
  right: 0;
  transform: translateX(25%);
  z-index: 5;
`;

export const MessageSectionContent: React.FC<ChannelRouteComponentType> = props => {
  const [toggleProfile, setToggleProfile] = useState(false);

  const handleClick = () => {
    setToggleProfile(!toggleProfile);
  };
  return (
    <MessageContextProvider>
      <Wrapper>
        <MessageSectionContentWrapper>
          <ChatContent {...props} />
          <ChatInputBox />
        </MessageSectionContentWrapper>
        <ToggleButton onClick={handleClick}>
          {toggleProfile ? (
            <IconBox imageSrc={RightArrow} />
          ) : (
            <IconBox imageSrc={LeftArrow} />
          )}
        </ToggleButton>
        <ProfileSection {...props} toggleProfile={toggleProfile} />
      </Wrapper>
    </MessageContextProvider>
  );
};
