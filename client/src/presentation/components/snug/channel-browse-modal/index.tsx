import React, { useState } from "react";
import styled from "styled-components";
import LetterXWhite from "assets/letter-x-white.png";
import { useModalToggledDispatch } from "contexts/modal-context";
import { CustomModal } from "presentation/components/atomic-reusable/custom-modal";
import { CustomDropDown } from "presentation/components/atomic-reusable/custom-drop-down";
import { IconBox } from "presentation/components/atomic-reusable/icon-box";
import { CustomButton } from "presentation/components/atomic-reusable/custom-button";
import { SortList } from "./sort-list";

const MarginBox = styled.section`
  width: 30%;
  height: 100%;
`;

const MarginBoxDropDown = styled.section`
  width: 10%;
  height: 100%;
`;

const Content = styled.section`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const InformationSection = styled.section`
  width: 100%;
  display: flex;
  justify-content: space-around;
`;

const InformationSectionHeader = styled.header`
  width: 100%;
  font-size: 1rem;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const Title = styled.section`
  font-weight: solid;
  font-size: 2rem;
  width: 100%;
`;

const DropdownWrapper = styled.section`
  display: flex;
`;

export enum DisplayType {
  "all" = "전체보기",
  "private" = "비밀 채널만 보기"
}

export enum SortType {
  "name" = "채널 이름 순",
  "createdAt" = "만든 날짜 순",
  "userLarge" = "사람 많은 순",
  "userSmall" = "사람 적은 순"
}

export const ChannelBrowseModal: React.FC = () => {
  const [selectedDisplayType, setSelectedDisplayType] = useState(
    DisplayType.all
  );
  const [selectedSortType, setSelectedSortType] = useState(SortType.name);

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
        <InformationSection>
          <InformationSectionHeader>채널에 대하여</InformationSectionHeader>
          <IconBox imageSrc={LetterXWhite} onClick={clickHandler} />
        </InformationSection>
        <Header>
          <Title>채널 목록</Title>
          <CustomButton
            color={"#148567"}
            fontColor={"#ffffff"}
            name={"채널 생성하기"}
            size={"big"}
            fontWeight={"bold"}
            fontSize={"0.9rem"}
          />
        </Header>
        <DropdownWrapper>
          <CustomDropDown
            list={Object.values(DisplayType)}
            type={"목록"}
            setSelected={setSelectedDisplayType}
          />
          <MarginBoxDropDown />
          <CustomDropDown
            list={Object.values(SortType)}
            type={"분류"}
            setSelected={setSelectedSortType}
          />
        </DropdownWrapper>
        <SortList
          DisplayType={selectedDisplayType}
          SortType={selectedSortType}
        />
      </Content>
      <MarginBox />
    </CustomModal>
  );
};
