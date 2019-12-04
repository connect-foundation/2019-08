import { AxiosWrapper } from "data/http/api/axios-wrapper";
import { ChannelApi } from "data/http/api/channel-api";
import { PostApi } from "data/http/api/post-api";
import { SnugApi } from "data/http/api/snug-api";

export class HttpProviderDependencies {
  private readonly channel: ChannelApi;
  private readonly post: PostApi;
  private readonly snug: SnugApi;
  private readonly axiosWrapper: AxiosWrapper;

  constructor() {
    this.axiosWrapper = new AxiosWrapper();
    this.channel = new ChannelApi(this.axiosWrapper);
    this.post = new PostApi(this.axiosWrapper);
    this.snug = new SnugApi(this.axiosWrapper);
  }

  getChannel(): ChannelApi {
    return this.channel;
  }

  getPost(): PostApi {
    return this.post;
  }

  getSnug(): SnugApi {
    return this.snug;
  }
}
