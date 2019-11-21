import { RouteComponentProps } from "react-router";

interface MatchType {
  channelId: string;
}

export interface ChannelMatchType extends RouteComponentProps<MatchType> {}
