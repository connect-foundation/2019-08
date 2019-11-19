import React from "react";
import styled from "styled-components";
import { CustomModal } from "presentation/components/atomic-reusable/custom-modal";
import { CustomDropDown } from "presentation/components/atomic-reusable/custom-drop-down";
import { ChannelBrowseModalItem } from "./channel-browse-modal-item";
import { CustomButton } from "presentation/components/atomic-reusable/custom-button";

const MarginBox = styled.section`
  width: 30%;
  height: 100%;
`;

const Content = styled.section`
  border: 1px solid white;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Header = styled.header`
  display: flex;
`;

const Title = styled.section`
border: 1px solid #000000;
  font-weight: solid;
  font-size: 2rem;
`

const DropdownWrapper = styled.section`
  display: flex;
`;

const SortSection = styled.section``;

export const ChannelBrowseModal: React.FC = () => {
  return (
    <CustomModal>
      <MarginBox />
      <Content>
        <Header><Title>채널 목록</Title><CustomButton {}/></Header>
        <DropdownWrapper>
          <CustomDropDown
            list={["만든 날짜 별", "사람 많은 순", "사람 적은 순"]}
            type={"분류"}
          />
          <CustomDropDown
            list={["만든 날짜 별", "사람 많은 순", "사람 적은 순"]}
            type={"분류"}
          />
        </DropdownWrapper>
        <ChannelBrowseModalItem />
      </Content>
      <MarginBox />
    </CustomModal>
  );
};
