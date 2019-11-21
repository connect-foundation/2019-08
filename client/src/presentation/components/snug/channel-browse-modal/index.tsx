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

export const ChannelBrowseModal: React.FC = () => {
  const [selectedDisplayType, setSelectedDisplayType] = useState(
    DisplayType.all
  );
  const [selectedSortType, setSelectedSortType] = useState(SortType.title);

  const dispatch = useModalToggledDispatch();

  const clickHandler = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    dispatch &&
      dispatch({
        type: "TOGGLE_CHANNEL_BROWSE_MODAL"
      });
  };

  return (
    <CustomModal>
      <MarginBox />
      <Content>
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
