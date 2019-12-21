import { AxiosWrapper } from "data/http/api/axios-wrapper";
import { ChannelApi } from "data/http/api/channel-api";
import { PostApi } from "data/http/api/post-api";
import { SnugApi } from "data/http/api/snug-api";
import { UserApi } from "data/http/api/user-api";
import { AuthApi } from "data/http/api/auth-api";
import { InviteApi } from "data/http/api/invite-api";
import { ProfileApi } from "data/http/api/profile-api";
import { UploadApi } from "data/http/api/upload-api";

export class HttpProviderDependencies {
  private readonly channel: ChannelApi;
  private readonly post: PostApi;
  private readonly snug: SnugApi;
  private readonly auth: AuthApi;
  private readonly user: UserApi;
  private readonly invite: InviteApi;
  private readonly profile: ProfileApi;
  private readonly uploadFile: UploadApi;
  private readonly axiosWrapper: AxiosWrapper;

  constructor() {
    this.axiosWrapper = new AxiosWrapper();
    this.channel = new ChannelApi(this.axiosWrapper);
    this.post = new PostApi(this.axiosWrapper);
    this.snug = new SnugApi(this.axiosWrapper);
    this.auth = new AuthApi(this.axiosWrapper);
    this.user = new UserApi(this.axiosWrapper);
    this.invite = new InviteApi(this.axiosWrapper);
    this.profile = new ProfileApi(this.axiosWrapper);
    this.uploadFile = new UploadApi(this.axiosWrapper);
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

  getInvite(): InviteApi {
    return this.invite;
  }

  getProfile(): ProfileApi {
    return this.profile;
  }

  getUpload(): UploadApi {
    return this.uploadFile;
  }
}
