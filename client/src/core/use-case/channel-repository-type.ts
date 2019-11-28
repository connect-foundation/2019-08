import { Channel } from "core/entity/channel";

export interface ChannelRepositoryType {
  create(channel: Channel): Promise<boolean | Channel>;

  hasByTitle(title: string): Promise<boolean>;

  getChannels(): Promise<Channel[] | boolean>;
}
