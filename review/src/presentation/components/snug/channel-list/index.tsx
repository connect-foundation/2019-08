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
    //서버에서 채널 목록을 불러와 채널 목록을 디스패치를 통해 인서트 하는기능
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
