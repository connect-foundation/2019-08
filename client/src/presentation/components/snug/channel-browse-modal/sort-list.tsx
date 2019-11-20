import React from "react";
import { DisplayType, SortType } from "./index";
import { useChannels, Channel, Channels } from "contexts/channel-context";
import { ChannelBrowseModalItem } from "./channel-browse-modal-item";

interface Criterion {
  DisplayType: DisplayType;
  SortType: SortType;
}

const returnSortedChannels = (channels: Channels, target: string) => {
  return channels.sort((channelA: Channel, channelB: Channel) => {
    return channelA[target] < channelB[target]
      ? -1
      : channelA[target] > channelB[target]
      ? 1
      : 0;
  });
};

const sortBySortType = (channels: Channels, sortType: SortType) => {
  switch (sortType) {
    case SortType.name:
      return returnSortedChannels(channels, "title");
    case SortType.createdAt:
      return returnSortedChannels(channels, "date");
    default:
      return null;
  }
};

export const SortList: React.FC<Criterion> = props => {
  const channels = useChannels();

  const sortChannels = () => {
    if (!channels) {
      return null;
    }
    const privateChannels =
      props.DisplayType === DisplayType.private
        ? channels.filter(channel => {
            return channel.privacy === true;
          })
        : null;

    const targetChannels = privateChannels ? privateChannels : channels;
    return sortBySortType(targetChannels, props.SortType);
  };

  return (
    <>
      {channels &&
        sortChannels()!.map(channel => {
          return (
            <ChannelBrowseModalItem
              key={channel.title}
              title={channel.title}
              description={channel.description}
              privacy={channel.privacy}
              user={channel.user}
              date={channel.date}
            />
          );
        })}
    </>
  );
};
