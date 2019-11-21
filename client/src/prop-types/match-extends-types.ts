import { Context } from "./../context.instance";
import { ChannelMatchType } from "./channel-match-type";

export interface ApplicationChannelMatchProps extends ChannelMatchType {
  Application: Context;
}
