import React from "react";
import styled from "styled-components";
import { IconBox } from "presentation/components/atomic-reusable/icon-box";
import Plus from "assets/plus-white.png";
import { useModalToggledDispatch } from "contexts/modal-context";

const Wrapper = styled.section`
  color: #ffffff;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.span`
  &:hover {
    opacity: 0.5;
  }
`;

const IconBoxWrapper = styled.section``;

export const ChannelHeader: React.FC = () => {
  const dispatch = useModalToggledDispatch();

  const openChannelPlusModal = (
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    dispatch &&
      dispatch({
        type: "TOGGLE_CHANNEL_PLUS_MODAL"
      });
  };

  const openChannelBrowseModal = (
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    dispatch &&
      dispatch({
        type: "TOGGLE_CHANNEL_BROWSE_MODAL"
      });
  };

  return (
    <Wrapper>
      <Title onClick={openChannelBrowseModal}>채널 목록</Title>
      <IconBoxWrapper onClick={openChannelPlusModal}>
        <IconBox imageSrc={Plus}></IconBox>
      </IconBoxWrapper>
    </Wrapper>
  );
};
