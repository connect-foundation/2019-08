import {ChannelApi} from "../../data/http/api/channel-api";
import axios from 'axios';
import {AxiosConfig} from "../../config/axios-config";

export class HttpProviderDependencies {
  public channel: ChannelApi;

  constructor() {
    AxiosConfig.initialize(axios);
    this.channel = new ChannelApi(axios);
  }
}
