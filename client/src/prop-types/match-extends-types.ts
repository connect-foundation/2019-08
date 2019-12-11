import { Context } from "./../context.instance";
import { ChannelRouteComponentType } from "./channel-match-type";
import { InviteRouteComponentType } from "./invite-match-type";

export interface AppChannelMatchProps extends ChannelRouteComponentType {
  Application: Context;
}

export interface AppInviteMatchProps extends InviteRouteComponentType {
  Application: Context;
}
