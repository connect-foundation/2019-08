import { RepositoryDependencies } from "@context/repositories/index";
import { ChannelService } from "core/service/channel-service";
import { PostService } from "core/service/post-service";
import { AuthService } from "core/service/auth-service";

export class ServiceDependencies {
  readonly channelService: ChannelService;
  readonly postService: PostService;
  readonly authService: AuthService;

  constructor(repositories: RepositoryDependencies) {
    this.channelService = new ChannelService(
      repositories.getChatRoom().getChannelRepository()
    );
    this.postService = new PostService(
      repositories.getPosting().getPostRepository()
    );
    this.authService = new AuthService(repositories.getAuth());
  }
}
