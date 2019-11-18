import {ChannelApi} from "../../data/http/api/channel-api";
import axios from 'axios';
import {AxiosConfig} from "../../config/axios-config";

export class HttpProviderDependencies {
  private readonly channel: ChannelApi;

  constructor() {
    AxiosConfig.initialize(axios);
    this.channel = new ChannelApi(axios);
  }

  getChannel(): ChannelApi {
    return this.channel;

  }

}
