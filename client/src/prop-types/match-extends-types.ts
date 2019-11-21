import { Context } from "./../context.instance";
import { ChannelRouteComponentType } from "./channel-match-type";

export interface ApplicationChannelMatchProps
  extends ChannelRouteComponentType {
  Application: Context;
}
