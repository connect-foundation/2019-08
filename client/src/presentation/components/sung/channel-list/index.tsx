import React from "react";
import styled from "styled-components";
import { ChannelHeader } from "./channel-header";
import { ChannelTitle } from "./channel-title";

const Wrapper = styled.section`
  background-color: #606060;
`;

const mockChannelTitleData = [
  "아침점호",
  "저녁점호",
  "영창",
  "잡담",
  "질문거리"
];

export const ChannelList: React.FC = () => {
  return (
    <Wrapper>
      <ChannelHeader></ChannelHeader>
      {mockChannelTitleData.map(title => (
        <ChannelTitle key={title} title={title} />
      ))}
    </Wrapper>
  );
};
