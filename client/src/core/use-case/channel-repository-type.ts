import {Channel} from "core/entity/channel";
import {Snug} from "core/entity/snug";
import {ParticipateInfo} from "core/entity/participate-info";
import {ChannelModel} from "core/model/channel-model";

export interface ChannelRepositoryType {
  create(channelModel: ChannelModel): Promise<Channel>;

  hasByTitleAndSnugId(title: string, snugId: string): Promise<boolean>;

  join(channelInfo: Channel): Promise<ParticipateInfo>;
  
  getParticipatingChannels(snug: Snug): Promise<Channel[]>;

  getChannels(snug: Snug): Promise<Channel[] | boolean>;

  getChannelById(channelId: number): Promise<Channel>;

  isInParticipating(snug: Snug, channel: Channel): Promise<boolean>;
}
