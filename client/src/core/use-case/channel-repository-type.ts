import {CancelToken} from "axios";
import {Channel} from "core/entity/channel";
import {Snug} from "core/entity/snug";
import {ParticipateInfo} from "../entity/participate-info";
import {ChannelModel} from "../model/channel-model";
import {ChannelsResponseType} from "../../data/http/api/response/type/channel";

export interface ChannelRepositoryType {
  create(channelModel: ChannelModel): Promise<Channel>;

  isAcceptableChannelTitleBySnugId(
    title: string,
    snugId: string
  ): Promise<boolean>;

  join(channelInfo: Channel): Promise<ParticipateInfo>;

  getParticipatingChannels(
    snug: Snug,
    cancelToken?: CancelToken
  ): Promise<Channel[]>;

  getChannels(snug: Snug): Promise<ChannelsResponseType>;

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
