import { Context } from "./../context.instance";
import { ChannelRouteComponentType } from "./channel-match-type";
import {InviteRouteComponentType} from "./invite-match-type";

export interface AppSocketChannelMatchProps extends ChannelRouteComponentType {
  Application: Context;
  socket: any;
}

export interface AppSocketInviteMatchProps extends InviteRouteComponentType {
  Application: Context;
  socket: any;
}