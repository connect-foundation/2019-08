import { ResponseEntity } from "./../http/api/response/ResponseEntity";
import { ChannelApi } from "../http/api/channel-api";
import { Channel } from "../../core/entity/channel";
import { ChannelRepositoryType } from "../../core/use-case/channel-repository-type";
import { Snug } from "core/entity/snug";

export class ChannelRepository implements ChannelRepositoryType {
  private api: ChannelApi;

  constructor(api: ChannelApi) {
    this.api = api;
  }

  async create(snug: Snug, channel: Channel): Promise<boolean | Channel> {
    try {
      const responseEntity = await this.api.create(snug, channel);
      if (typeof responseEntity == "boolean") return false;
      return (<ResponseEntity<Channel>>responseEntity).payload;
    } catch (error) {
      return false;
    }
  }

  async hasByTitle(title: string): Promise<boolean> {
    try {
      const responseEntity = await this.api.findByTitle(title);
      return !!responseEntity;
    } catch (error) {
      return false;
    }
  }

  async getChannels(snug: Snug): Promise<Channel[] | boolean> {
    try {
      const ResponseEntity = await this.api.getList(snug);
      if (ResponseEntity)
        return (<ResponseEntity<Channel[]>>ResponseEntity).payload;
      return false;
    } catch (error) {
      return false;
    }
  }
}
