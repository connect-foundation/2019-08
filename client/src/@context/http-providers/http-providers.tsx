import { AxiosWrapper } from "data/http/api/axios-wrapper";
import { ChannelApi } from "data/http/api/channel-api";
import { PostApi } from "data/http/api/post-api";
import { SnugApi } from "data/http/api/snug-api";
import { UserApi } from "data/http/api/user-api";
import { AuthApi } from "data/http/api/auth-api";

export class HttpProviderDependencies {
  private readonly channel: ChannelApi;
  private readonly post: PostApi;
  private readonly snug: SnugApi;
  private readonly auth: AuthApi;
  private readonly user: UserApi;
  private readonly axiosWrapper: AxiosWrapper;

  constructor() {
    this.axiosWrapper = new AxiosWrapper();
    this.channel = new ChannelApi(this.axiosWrapper);
    this.post = new PostApi(this.axiosWrapper);
    this.snug = new SnugApi(this.axiosWrapper);
    this.auth = new AuthApi(this.axiosWrapper);
    this.user = new UserApi(this.axiosWrapper);
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
  
  getAuth(): AuthApi {
    return this.auth;
  }

  getUser(): UserApi {
    return this.user;
  }
}
