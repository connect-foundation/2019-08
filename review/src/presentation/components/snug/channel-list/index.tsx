import React, { useEffect } from "react";
import styled from "styled-components";
import { ChannelHeader } from "./channel-header";
import { ChannelTitle } from "./channel-title";
import { useChannels, useChannelDispatch } from "contexts/channel-context";
import { match } from "react-router";
import { ChannelMatchType } from "prop-types/channel-match-type";
import { History } from "history";
import { Context } from "context.instance";

const Wrapper = styled.section`
  padding: 10px 0px;
`;

interface PropTypes {
  match: match<ChannelMatchType>;
  socket: SocketIO.Server;
  history: History<any>;
  Application: Context;
}

export const ChannelList: React.FC<PropTypes> = ({
  match,
  socket,
  history,
  Application
}) => {
  const channels = useChannels();
  const dispatch = useChannelDispatch();

  useEffect(() => {
    if (!match.params.channelId) socket.emit("join", match.params.channelId);
    (async function() {
      const channel = await Application.services.channelService.getChannelList();
      if (typeof channel === "boolean" || !dispatch) return;
      dispatch({
        type: "MULTI",
        channels: channel
      });
    })();
  }, []);

  return (
    <Wrapper>
      <ChannelHeader></ChannelHeader>
      {channels &&
        channels.map(channel => (
          <ChannelTitle
            key={channel.id!}
            id={channel.id!}
            title={channel.title!}
            match={match}
            history={history}
          />
        ))}
    </Wrapper>
  );
};
