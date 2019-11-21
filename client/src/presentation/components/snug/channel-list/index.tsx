import React from "react";
import styled from "styled-components";
import { ChannelHeader } from "./channel-header";
import { ChannelTitle } from "./channel-title";
import { useChannels } from "contexts/channel-context";
import { match } from "react-router";
import { ChannelMatchType } from "prop-types/channel-match-type";

const Wrapper = styled.section`
  background-color: #606060;
`;

interface PropTypes {
  match: match<ChannelMatchType>;
}

export const ChannelList: React.FC<PropTypes> = ({ match }) => {
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
