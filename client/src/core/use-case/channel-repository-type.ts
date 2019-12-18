import { CancelToken } from "axios";
import { Channel } from "core/entity/channel";
import { Snug } from "core/entity/snug";
import { ParticipateInfo } from "../entity/participate-info";
import { ChannelModel } from "../model/channel-model";

export interface ChannelRepositoryType {
  create(channelModel: ChannelModel): Promise<Channel>;

  hasByTitleAndSnugId(title: string, snugId: string): Promise<boolean>;

  join(channelInfo: Channel): Promise<ParticipateInfo>;

  getParticipatingChannels(
    snug: Snug,
    cancelToken?: CancelToken
  ): Promise<Channel[]>;

  getChannels(snug: Snug): Promise<Channel[] | boolean>;

  getChannelById(
    channelId: number,
    cancelToken?: CancelToken
  ): Promise<Channel>;

  isInParticipating(
    snug: Snug,
    channel: Channel,
    cancelToken?: CancelToken
  ): Promise<boolean>;
}
