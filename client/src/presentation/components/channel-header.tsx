import React from "react";
import styled from "styled-components";
import { IconBox } from "./icon-box";
import Plus from "../../assets/plus-white.png";

const ChannelHeaderSection = styled.section`
  color: #ffffff;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ChannelHeaderTitle = styled.span`
  &:hover {
    opacity: 0.5;
  }
`;

export const ChannelHeader: React.FC = () => {
  return (
    <ChannelHeaderSection>
      <ChannelHeaderTitle>채널 목록</ChannelHeaderTitle>
      <IconBox imageSrc={Plus}></IconBox>
    </ChannelHeaderSection>
  );
};
