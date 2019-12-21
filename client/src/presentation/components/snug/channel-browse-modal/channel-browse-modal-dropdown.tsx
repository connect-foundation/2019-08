import React from "react";
import styled from "styled-components";
import { DisplayType, SortType } from "./index";
import { CustomDropDown } from "presentation/components/atomic-reusable/custom-drop-down";

const Wrapper = styled.section`
  display: flex;
  width: 100%;
`;

const MarginBoxDropDown = styled.section`
  height: 100%;
`;

interface PropTypes {
  changeDisplayType(parameter: DisplayType): void;
  changeSortType(parameter: SortType): void;
  selectedDisplayType: DisplayType;
  selectedSortType: SortType;
}

export const ChannelBrowseModalDropdown: React.FC<PropTypes> = ({
  changeDisplayType,
  changeSortType,selectedSortType,selectedDisplayType
}) => {
  return (
    <Wrapper>
      <CustomDropDown
        list={Object.values(DisplayType)}
        type={"목록"}
        setSelected={changeDisplayType}
        selected={selectedDisplayType}
      />
      <MarginBoxDropDown />
      <CustomDropDown
        list={Object.values(SortType)}
        type={"분류"}
        setSelected={changeSortType}
        selected={selectedSortType}
      />
    </Wrapper>
  );
};
