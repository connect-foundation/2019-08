import { Channel } from "core/entity/channel";
import { Snug } from "core/entity/snug";
import {ParticipateInfo} from "../entity/participate-info";

export interface ChannelRepositoryType {
  create(snug: Snug, channel: Channel): Promise<boolean | Channel>;

  hasByTitle(title: string): Promise<boolean>;

  join(channelInfo: Channel): Promise<ParticipateInfo>;
  
  getParticipatingChannels(snug: Snug): Promise<Channel[] | boolean>;

  getChannels(snug: Snug): Promise<Channel[] | boolean>;

  getChannelById(channelId: number): Promise<Channel>;

  isInParticipating(snug: Snug, channel: Channel): Promise<boolean>;
}
