import { ChannelApi } from "data/http/api/channel-api";
import { AxiosWrapper } from "data/http/api/axios-wrapper";
import { PostApi } from "data/http/api/post-api";
import {InviteApi} from "data/http/api/invite-api";

export class HttpProviderDependencies {
  private readonly channel: ChannelApi;
  private readonly post: PostApi;
  private readonly invite: InviteApi;

  private readonly axiosWrapper: AxiosWrapper;

  constructor() {
    this.axiosWrapper = new AxiosWrapper();
    this.channel = new ChannelApi(this.axiosWrapper);
    this.post = new PostApi(this.axiosWrapper);
    this.invite = new InviteApi(this.axiosWrapper);
  }

  getChannel(): ChannelApi {
    return this.channel;
  }

  getPost(): PostApi {
    return this.post;
  }

  getInvite(): InviteApi {
    return this.invite;
  }
}
