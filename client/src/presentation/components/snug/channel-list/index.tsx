import React, { useEffect } from "react";
import styled from "styled-components";
import { ChannelHeader } from "./channel-header";
import { ChannelTitle } from "./channel-title";
import { useChannels } from "contexts/channel-context";
import { match } from "react-router";
import { ChannelMatchType } from "prop-types/channel-match-type";
import { History } from "history";

const Wrapper = styled.section`
  padding: 10px 0px;
`;

interface PropTypes {
  match: match<ChannelMatchType>;
  socket: SocketIO.Server;
  history: History<any>;
}

export const ChannelList: React.FC<PropTypes> = ({
  match,
  socket,
  history
}) => {
  const channels = useChannels();

  useEffect(() => {
    if (!match.params.channelId) socket.emit("join", match.params.channelId);
  }, []);

  return (
    <Wrapper>
      <ChannelHeader></ChannelHeader>
      {channels &&
        channels.map(channel => (
          <ChannelTitle
            key={channel.title}
            title={channel.title}
            match={match}
            history={history}
          />
        ))}
    </Wrapper>
  );
};
