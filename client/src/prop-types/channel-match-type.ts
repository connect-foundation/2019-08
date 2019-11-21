import { RouteComponentProps } from "react-router";

export interface ChannelMatchType {
  channelId: string;
}

export interface ChannelRouteComponentType
  extends RouteComponentProps<ChannelMatchType> {}
