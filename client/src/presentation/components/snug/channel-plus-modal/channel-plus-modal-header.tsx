import React from "react";
import styled from "styled-components";
import { IconBox } from "presentation/components/atomic-reusable/icon-box";
import LetterXWhite from "assets/letter-x-white.png";
import { useModalToggledDispatch } from "contexts/modal-context";

const ChannelPlusModalHeaderWrapper = styled.section`
  display: flex;
  flex-direction: column;
  height: 20%;
  width: 100%;
  justify-content: space-between;
`;

const ModalHeader = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
`;

const ChannelPlusModalTitle = styled.header`
  color: #ffffff;
  font-weight: bold;
  font-size: 1.75rem;
`;

const ChannelPlusModalDescription = styled.section`
  color: #ffffff;
  word-break: break-word;
  height: 100%;
`;

export const ChannelPlusModalHeader: React.FC = () => {
  const dispatch = useModalToggledDispatch();

  const clickHandler = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    dispatch &&
      dispatch({
        type: "TOGGLE_CHANNEL_PLUS_MODAL"
      });
  };

  return (
    <ChannelPlusModalHeaderWrapper>
      <ModalHeader>
        <ChannelPlusModalTitle>채널 만들기 </ChannelPlusModalTitle>
        <IconBox imageSrc={LetterXWhite} onClick={clickHandler} />
      </ModalHeader>
      <ChannelPlusModalDescription>
        채널은 구성원들끼리 소통할 수 있는 공간입니다. 특정 주제를 기반으로
        조직된다면 최고의 효율을 가져올 수 있습니다.
      </ChannelPlusModalDescription>
    </ChannelPlusModalHeaderWrapper>
  );
};
