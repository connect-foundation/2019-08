import { ChannelApi } from "data/http/api/channel-api";
import { AxiosWrapper } from "data/http/api/axios-wrapper";
import { PostApi } from "data/http/api/post-api";
import { AuthApi } from "data/http/api/auth-api";

export class HttpProviderDependencies {
  private readonly channel: ChannelApi;
  private readonly post: PostApi;
  private readonly auth: AuthApi;
  private readonly axiosWrapper: AxiosWrapper;

  constructor() {
    this.axiosWrapper = new AxiosWrapper();
    this.channel = new ChannelApi(this.axiosWrapper);
    this.post = new PostApi(this.axiosWrapper);
    this.auth = new AuthApi(this.axiosWrapper);
  }

  getChannel(): ChannelApi {
    return this.channel;
  }

  getPost(): PostApi {
    return this.post;
  }

  getAuth(): AuthApi {
    return this.auth;
  }
}
