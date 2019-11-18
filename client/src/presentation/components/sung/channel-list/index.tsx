import React from "react";
import styled from "styled-components";
import { ChannelHeader } from "./channel-header";
import { ChannelTitle } from "./channel-title";
import { useChannels } from "../../contexts/channel-context";

const Wrapper = styled.section`
  background-color: #606060;
`;

export const ChannelList: React.FC = () => {
  const channels = useChannels();
  return (
    <Wrapper>
      <ChannelHeader></ChannelHeader>
      {channels.map(channel => (
        <ChannelTitle key={channel.title} title={channel.title} />
      ))}
    </Wrapper>
  );
};
