import React, {useEffect} from "react";
import styled from "styled-components";
import {ChannelHeader} from "./channel-header";
import {ChannelTitle} from "./channel-title";
import {useChannels, useChannelDispatch, Channels} from "contexts/channel-context";
import {match} from "react-router";
import {ChannelMatchType} from "prop-types/channel-match-type";
import {History} from "history";
import {Context} from "context.instance";
import {
  usePathParameterDispatch
} from "contexts/path-parameter-context";

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  height: 100%
`;

const PublicityWrapper = styled.section`
  padding: 10px 0px;
  flex: 1;
  border-bottom: 1px solid ${({ theme }) => theme.snugBorderColor};
`;

const PrivacyWrapper = styled.section`
  padding: 10px 0px;
  flex: 3;
`;

const TitleWrapper = styled.section`
  font-size: 1.3rem;
  margin: 0.5rem;
`;

interface PropTypes {
  match: match<ChannelMatchType>;
  history: History<any>;
  Application: Context;
}

const pickPrivacy = (channels: Channels) => channels.filter(channel => channel.isPrivate);
const pickPublicity = (channels: Channels) => channels.filter(channel => !channel.isPrivate);
export const ChannelList: React.FC<PropTypes> = ({
                                                   match,
                                                   history,
                                                   Application
                                                 }) => {
  const channels = useChannels();
  const dispatch = useChannelDispatch();
  const pathParameterDispatch = usePathParameterDispatch();
  useEffect(() => {
    pathParameterDispatch({
      type: "GETSNUGID",
      snugId: Number(match.params.snugId)
    });
  }, []);
  useEffect(() => {
    (async function () {
      const snugId = Number(match.params.snugId);
      const channel = await Application.services.channelService.getParticipatingChannelList(snugId);
      if (typeof channel === "boolean" || !dispatch) return;
      dispatch({
        type: "MULTI",
        channels: channel
      });
    })();
  }, []);

  const publicChannels = pickPublicity(channels);
  const privateChannels = pickPrivacy(channels);
  return (
          <Wrapper>
            <ChannelHeader/>
            <PublicityWrapper>
              <TitleWrapper>공유 채널</TitleWrapper>
              {publicChannels &&
              publicChannels.map(channel => (
                      <ChannelTitle
                              key={channel.id!}
                              id={channel.id!}
                              title={channel.title!}
                              match={match}
                              history={history}/>
              ))}
            </PublicityWrapper>
            <PrivacyWrapper>
                <TitleWrapper>개인 채널</TitleWrapper>
              {privateChannels &&
              privateChannels.map(channel => (
                      <ChannelTitle
                              key={channel.id!}
                              id={channel.id!}
                              title={channel.title!}
                              match={match}
                              history={history}/>
              ))}
            </PrivacyWrapper>
          </Wrapper>
  );
};
