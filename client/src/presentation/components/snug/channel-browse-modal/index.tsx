import React, { useState } from "react";
import styled from "styled-components";
import { useModalToggledDispatch } from "contexts/modal-context";
import { CustomModal } from "presentation/components/atomic-reusable/custom-modal";
import { ChannelBrowseModalSortList } from "./channel-browse-modal-sort-list";
import { ChannelBrowseModalDropdown } from "./channel-browse-modal-dropdown";
import { ChannelBrowseModalHeader } from "./channel-browse-modal-header";
import { ChannelBrowseModalInformation } from "./channel-browse-modal-information";
import { RouteComponentProps } from "react-router";
import { ApplicationProptype } from "prop-types/application-type";

const Content = styled.section`
  max-height: 80vh;
  min-width: 700px;
  width: 700px;
  max-width: 700px;
  display: flex;
  flex-direction: column;
  align-items: center;
  &:focus {
    outline: none;
  }
`;

export enum DisplayType {
  "all" = "전체보기",
  "private" = "비밀 채널만 보기"
}

export enum SortType {
  "title" = "채널 이름 순",
  "createdAt" = "만든 날짜 순",
  "userLarge" = "사람 많은 순",
  "userSmall" = "사람 적은 순"
}

// todo : 해당 section뿐만 아니라 전역적으로 keydown 이벤트가 적용될 수 있도록 함수 위치 변경
export const ChannelBrowseModal: React.FC<ApplicationProptype &
  RouteComponentProps> = props => {
  const [selectedDisplayType, setSelectedDisplayType] = useState(
    DisplayType.all
  );
  const [selectedSortType, setSelectedSortType] = useState(SortType.title);

  const dispatch = useModalToggledDispatch();

  const toggleChannelBrowseModal = () => {
    dispatch &&
      dispatch({
        type: "TOGGLE_CHANNEL_BROWSE_MODAL"
      });
  };

  const clickHandler = () => {
    toggleChannelBrowseModal();
  };

  const keyDownHandler = () => {
    toggleChannelBrowseModal();
  };

  const Wrapper = styled.section`
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
  `;

  return (
    <CustomModal>
      <ChannelBrowseModalInformation onClick={clickHandler} />
      <Wrapper>
        <Content tabIndex={-1} onKeyDown={keyDownHandler}>
          <ChannelBrowseModalHeader />
          <ChannelBrowseModalDropdown
            setSelectedDisplayType={setSelectedDisplayType}
            setSelectedSortType={setSelectedSortType}
          />
          <ChannelBrowseModalSortList
            {...props}
            DisplayType={selectedDisplayType}
            SortType={selectedSortType}
          />
        </Content>
      </Wrapper>
    </CustomModal>
  );
};
