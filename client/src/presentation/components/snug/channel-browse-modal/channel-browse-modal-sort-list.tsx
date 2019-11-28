import React from "react";
import { DisplayType, SortType } from "./index";
import { useChannels, Channels } from "contexts/channel-context";
import { ChannelBrowseModalItem } from "./channel-browse-modal-item";
import { Channel } from "core/entity/channel";
import styled from "styled-components";

interface Criterion {
  DisplayType: DisplayType;
  SortType: SortType;
}

const Wrraper = styled.section`
  width: 100%;
  height: 70%;
  margin-top: 20px;
  overflow-y: scroll;
`;

const compareChannels = (channelA: any, channelB: any) => {
  if (Object.prototype.toString.call(channelA) === "[object Date]") {
    return channelA.getTime() < channelB.getTime()
      ? -1
      : channelA.getTime() > channelB.getTime()
      ? 1
      : 0;
  }
  return channelA < channelB ? -1 : channelA > channelB ? 1 : 0;
};

const returnSortedChannels = (channels: Channels, target: string) => {
  return channels.sort((channelA: Channel, channelB: Channel) => {
    return compareChannels(channelA[target], channelB[target]);
  });
};

const sortBySortType = (channels: Channels, sortType: SortType) => {
  switch (sortType) {
    case SortType.title:
      return returnSortedChannels(channels, "title");
    case SortType.createdAt:
      return returnSortedChannels(channels, "createdAt");

    //todo : null을 대체할 적절한 반환형 생각하기
    default:
      return null;
  }
};

const filterPrivateChannels = (channels: Channels, props: DisplayType) => {
  if (props === DisplayType.private) {
    return channels.filter(channel => {
      return channel.privacy;
    });
  }
  return null;
};

export const ChannelBrowseModalSortList: React.FC<Criterion> = props => {
  const channels = useChannels();

  const sortChannels = () => {
    if (!channels) {
      return null;
    }

    const privateChannels = filterPrivateChannels(channels, props.DisplayType);

    const targetChannels = privateChannels ? privateChannels : channels;
    return sortBySortType(targetChannels, props.SortType);
  };

  return (
    <Wrraper>
      {channels &&
        sortChannels()!.map(channel => {
          return (
            <ChannelBrowseModalItem
              key={channel.title}
              title={channel.title}
              description={channel.description}
              privacy={channel.privacy}
              user={channel.user}
              createdAt={channel.createdAt}
            />
          );
        })}
    </Wrraper>
  );
};
