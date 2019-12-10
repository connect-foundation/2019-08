import { RouteComponentProps } from "react-router";

export interface ChannelMatchType {
  snugId: string;
  channelId?: string;
}

export interface ChannelRouteComponentType
  extends RouteComponentProps<ChannelMatchType> {}
