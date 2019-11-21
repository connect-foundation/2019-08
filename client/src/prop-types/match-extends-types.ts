import { Context } from "./../context.instance";
import { ChannelRouteComponentType } from "./channel-match-type";

export interface AppSocketChannelMatchProps extends ChannelRouteComponentType {
  Application: Context;
  socket: SocketIO.Server;
}
