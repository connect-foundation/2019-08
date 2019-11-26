import { Channel } from "core/entity/channel";

export interface ChannelRepositoryType {
  create(channel: Channel): Promise<boolean>;

  hasByTitle(title: string): Promise<boolean>;

  getChannels(): Promise<Channel[] | boolean>;
}
