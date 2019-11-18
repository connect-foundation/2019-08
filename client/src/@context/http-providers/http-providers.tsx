import {ChannelApi} from "data/http/api/channel-api";
import {AxiosWrapper} from "data/http/api/axios-wrapper";

export class HttpProviderDependencies {
  private readonly channel: ChannelApi;
  private readonly axiosWrapper: AxiosWrapper;

  constructor() {
    this.axiosWrapper = new AxiosWrapper();
    this.channel = new ChannelApi(this.axiosWrapper);
  }

  getChannel(): ChannelApi {
    return this.channel;
  }
}
