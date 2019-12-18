import React, {useContext, useEffect, useState} from "react";
import {DisplayType, SortType} from "./index";
import {Channels} from "contexts/channel-context";
import {globalApplication} from "contexts/application-context";
import {ChannelBrowseModalItem} from "./channel-browse-modal-item";
import {Channel} from "core/entity/channel";
import styled from "styled-components";
import {ApplicationProptype} from "prop-types/application-type";
import {RouteComponentProps} from "react-router";
import {usePathParameter} from "../../../../contexts/path-parameter-context";

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

export const ChannelBrowseModalSortList: React.FC<Criterion &
  ApplicationProptype &
  RouteComponentProps> = props => {
  const [channels, addChannels] = useState<Channels>([]);
  const application = useContext(globalApplication);
  const pathParameter = usePathParameter();

  useEffect(() => {
    (async function() {
      const snugId = Number(pathParameter.snugId);
      const channels = await application.services.channelService.getChannelList(snugId);
      if (typeof channels === "boolean") return;
      addChannels(channels);
    })();
  }, []);

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
              {...props}
              key={channel.title}
              id={channel.id}
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
