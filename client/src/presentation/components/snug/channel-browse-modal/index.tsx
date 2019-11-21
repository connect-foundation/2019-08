import React, { useState } from "react";
import styled from "styled-components";
import { useModalToggledDispatch } from "contexts/modal-context";
import { CustomModal } from "presentation/components/atomic-reusable/custom-modal";
import { ChannelBrowseModalSortList } from "./channel-browse-modal-sort-list";
import { ChannelBrowseModalDropdown } from "./channel-browse-modal-dropdown";
import { ChannelBrowseModalHeader } from "./channel-browse-modal-header";
import { ChannelBrowseModalInformation } from "./channel-browse-modal-information";

const MarginBox = styled.section`
  width: 30%;
  height: 100%;
`;

const Content = styled.section`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
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
export const ChannelBrowseModal: React.FC = () => {
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

  const clickHandler = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    toggleChannelBrowseModal();
  };

  const keyDownHandler = (event: React.KeyboardEvent<HTMLElement>) => {
    toggleChannelBrowseModal();
  };

  return (
    <CustomModal>
      <MarginBox />
      <Content tabIndex={-1} onKeyDown={keyDownHandler}>
        <ChannelBrowseModalInformation onClick={clickHandler} />
        <ChannelBrowseModalHeader />
        <ChannelBrowseModalDropdown
          setSelectedDisplayType={setSelectedDisplayType}
          setSelectedSortType={setSelectedSortType}
        />
        <ChannelBrowseModalSortList
          DisplayType={selectedDisplayType}
          SortType={selectedSortType}
        />
      </Content>
      <MarginBox />
    </CustomModal>
  );
};
