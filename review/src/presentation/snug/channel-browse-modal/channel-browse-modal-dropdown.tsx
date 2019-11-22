import React from "react";
import styled from "styled-components";
import { DisplayType, SortType } from "./index";
import { CustomDropDown } from "presentation/components/atomic-reusable/custom-drop-down";

const Wrapper = styled.section`
  display: flex;
`;

const MarginBoxDropDown = styled.section`
  width: 10%;
  height: 100%;
`;

interface PropTypes {
  setSelectedDisplayType(parameter: any | void): any | void;
  setSelectedSortType(parameter: any | void): any | void;
}

export const ChannelBrowseModalDropdown: React.FC<PropTypes> = ({
  setSelectedDisplayType,
  setSelectedSortType
}) => {
  return (
    <Wrapper>
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
    </Wrapper>
  );
};
