import React from "react";
import styled from "styled-components";
import { IconBox } from "presentation/components/atomic-reusable/icon-box";
import Plus from "assets/plus-white.png";
import { useModalToggledDispatch } from "contexts/modal-context";

const Wrapper = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 20px;
  height: 50px;
  border-bottom: 1px solid ${({ theme }) => theme.snugBorderColor};
`;

const Title = styled.span`
  &:hover {
    color: ${({ theme }) => theme.sidebarFontHover};
  }
`;

const IconBoxWrapper = styled.section`
  box-sizing: border-box;
`;

export const ChannelHeader: React.FC = () => {
  const dispatch = useModalToggledDispatch();

  const openChannelPlusModal = () => {
    dispatch &&
      dispatch({
        type: "TOGGLE_CHANNEL_PLUS_MODAL"
      });
  };

  const openChannelBrowseModal = () => {
    dispatch &&
      dispatch({
        type: "TOGGLE_CHANNEL_BROWSE_MODAL"
      });
  };

  return (
    <Wrapper>
      <Title onClick={openChannelBrowseModal}>채널 목록</Title>
      <IconBoxWrapper onClick={openChannelPlusModal}>
        <IconBox imageSrc={Plus} size="25px"></IconBox>
      </IconBoxWrapper>
    </Wrapper>
  );
};
