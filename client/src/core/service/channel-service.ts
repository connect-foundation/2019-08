import { ChannelRepositoryType } from "core/use-case/channel-repository-type";
import { ChannelModel } from "core/model/channel-model";
import { Channel } from "core/entity/channel";
import { Snug } from "core/entity/snug";
import { ParticipateInfo } from "../entity/participate-info";
import { CancelToken } from "axios";

/**
 *
 * 채널 비즈니스 로직 처리하는 객체
 *
 * */
export class ChannelService {
  private repository: ChannelRepositoryType;

  constructor(channelRepository: ChannelRepositoryType) {
    this.repository = channelRepository;
  }

  /**
   *
   * 채널 생성
   *
   * @param snugId
   * @param title
   * @param description
   * @param privacy
   * @return boolean 생성 여부
   *
   * */
  async create(
    title: string,
    snugId: string,
    description: string,
    privacy: boolean
  ): Promise<Channel> {
    const channel: ChannelModel = new ChannelModel(
      title,
      snugId,
      description,
      privacy
    );
    const satisfaction = await this.isSatisfied(channel);
    if (satisfaction) {
      const reflectedChannel = await this.repository.create(channel);
      return this.convertToChannel(reflectedChannel);
    }

    return {};
  }

  /**
   *
   * 채널 생성하기 위한 검증
   * @param channel
   *
   * */
  private async isSatisfied(channel: ChannelModel): Promise<boolean> {
    if (channel.isImpossibleFormat()) {
      return false;
    }
    return await this.isAcceptableChannel(channel);
  }

  /**
   *
   * 채널명 중복 확인
   * @param channel
   *
   * */
  private isAcceptableChannel(channel: ChannelModel): Promise<boolean> {
    return this.repository.isAcceptableChannelTitleBySnugId(
      channel.getTitle(),
      channel.getSnugId()
    );
  }

  async getChannelList(snugId: number): Promise<Channel[]> {
    const snug: Snug = { id: snugId };
    const {channels} = await this.repository.getChannels(snug);
    return this.convertToChannels(channels);
  }

  getChannelById(
    channelId: number,
    cancelToken?: CancelToken
  ): Promise<Channel> {
    return this.repository.getChannelById(channelId, cancelToken);
  }

  async getParticipatingChannelList(
    snugId: number,
    canselToken?: CancelToken
  ): Promise<Channel[]> {
    const snug: Snug = { id: snugId };
    const channels =  await this.repository.getParticipatingChannels(snug, canselToken);
    return this.convertToChannels(channels);
  }

  private convertToChannel(channel: Channel): Channel {
    return {
      id: channel.id,
      title: channel.title,
      description: channel.description,
      createdAt: channel.createdAt,
      privacy: channel.isPrivate
    };
  }

  private convertToChannels(channels: Channel[]): Channel[] {
    return channels.map(channel => this.convertToChannel(channel));
  }

  join(channelId: number): Promise<ParticipateInfo> {
    const channel: Channel = { id: channelId };
    return this.repository.join(channel);
  }

  isInParticipating(
    snugId: number,
    channelId: number,
    cancleToken?: CancelToken
  ): Promise<boolean> {
    const snug: Snug = { id: snugId };
    const channel: Channel = { id: channelId };
    return this.repository.isInParticipating(snug, channel, cancleToken);
  }
}
