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
  width: 700px;
  color: ${({ theme }) => theme.snugMainFont};
  display: flex;
  flex-direction: column;
  align-items: center;
  &:focus {
    outline: none;
  }
  @media (min-width: 800px) {
    min-width: 500px;
  }
  @media (min-width: 1200px) {
    min-width: 700px;
  }
`;

export enum DisplayType {
  "all" = "전체보기",
  "private" = "비밀 채널만 보기"
}

export enum SortType {
  "title" = "채널 이름 순",
  "createdAt" = "만든 날짜 순"
}

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

  const changeDisplayType = (value: DisplayType) => {
    setSelectedDisplayType(value);
  };

  const changeSortType = (value: SortType) => {
    setSelectedSortType(value);
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
            changeDisplayType={changeDisplayType}
            changeSortType={changeSortType}
            selectedDisplayType={selectedDisplayType}
            selectedSortType={selectedSortType}
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
