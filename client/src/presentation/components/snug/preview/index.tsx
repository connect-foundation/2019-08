import React, { useContext, useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { globalApplication } from "contexts/application-context";
import { usePathParameter } from "contexts/path-parameter-context";
import { AppChannelMatchProps } from "prop-types/match-extends-types";
import { useChannelDispatch } from "../../../../contexts/channel-context";
import { Channel } from "../../../../core/entity/channel";

type PropsType = {
  setIsParticipated: React.Dispatch<React.SetStateAction<boolean>>;
};

const hasFields = (channel: Channel): boolean => {
  return Object.keys(channel).length > 0;
};

export const Preview: React.FC<AppChannelMatchProps & PropsType> = props => {
  const application = useContext(globalApplication);
  const pathParameter = usePathParameter();
  const { setIsParticipated } = props;
  const [channel, changeChannel] = useState<Channel>({});
  const channelDispatch = useChannelDispatch();

  useEffect(() => {
    (async function() {
      try {
        const channels = await application.services.channelService.getChannelById(
          pathParameter.channelId!
        );
        if (!!channels) {
          changeChannel(channels);
        }
      } catch (error) {
        console.log(error);
        changeChannel({});
      }
    })();
  }, [pathParameter.channelId, application.services.channelService]);

  async function join() {
    try {
      const { channel } = await application.services.channelService.join(
        pathParameter.channelId!
      );
      setIsParticipated(!!channel);
      channelDispatch &&
        channelDispatch({ type: "MULTI", channels: [channel] });
    } catch (error) {
      setIsParticipated(false);
    }
  }

  return hasFields(channel) ? (
    <PreviewWrrapper>
      <article>
        <H1>{channel.title} 채널에 참가하시겠습니까?</H1>
        <P>{channel.description}</P>
      </article>
      <StyledJoinButton onClick={join}>참가하기</StyledJoinButton>
      <StyledBackButton>나가기</StyledBackButton>
    </PreviewWrrapper>
  ) : (
    <></>
  );
};

const PreviewWrrapper = styled.section`
  width: 100%;
  min-height: 150px;
  max-height: 150px;
  background-color: ${({ theme }) => theme.snugHover};
  color: ${({ theme }) => theme.snugMainFont};
  padding-top: 10px;
  padding-bottom: 20px;
  box-sizing: border-box;
  text-align: center;
`;
const StyledButton = css`
  box-sizing: border-box;
  width: 90px;
  height: 30px;
  font-size: 12pt;
  padding: 0px;
  margin: 0px 10px;
  color: inherit;
  border: none;
  border-radius: 5px;
`;

const StyledJoinButton = styled.button`
  ${StyledButton}
  background-color: ${({ theme }) => theme.mainButtonColor};
  &:hover {
    background-color: ${({ theme }) => theme.mainButtonColorHover};
  }
`;

const StyledBackButton = styled.button`
  ${StyledButton}
  background-color: ${({ theme }) => theme.subButtonColor};
  &:hover {
    background-color: ${({ theme }) => theme.subButtonColorHover};
    color: black;
  }
`;

const H1 = styled.h1`
  font-size: 21pt;
  margin: 10px 0;
  font-weight: bold;
`;

const P = styled.p`
  display: inline-block;
  margin: 0;
  margin-bottom: 20px;
  font-size: 10pt;
  font-weight: 500;
`;
