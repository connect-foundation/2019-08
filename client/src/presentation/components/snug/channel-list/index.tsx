import React from "react";
import styled from "styled-components";
import { ChannelHeader } from "./channel-header";
import { ChannelTitle } from "./channel-title";
import { useChannels } from "contexts/channel-context";

const Wrapper = styled.section`
  padding: 10px 0px;
`;

export const ChannelList: React.FC = () => {
  const channels = useChannels();

  return (
    <Wrapper>
      <ChannelHeader></ChannelHeader>
      {channels &&
        channels.map(channel => (
          <ChannelTitle key={channel.title} title={channel.title} />
        ))}
    </Wrapper>
  );
};
