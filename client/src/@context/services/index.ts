import { RepositoryDependencies } from "@context/repositories/index";
import { ChannelService } from "core/service/channel-service";
import { PostService } from "core/service/post-service";
import { SnugService } from "core/service/snug-service";
import { AuthService } from "core/service/auth-service";
import { UserService } from "core/service/user-service";
import { InviteService } from "core/service/invite-service";
import { ProfileService } from "core/service/profile-service";

export class ServiceDependencies {
  readonly channelService: ChannelService;
  readonly userService: UserService;
  readonly postService: PostService;
  readonly snugService: SnugService;
  readonly authService: AuthService;
  readonly inviteService: InviteService;
  readonly profileService: ProfileService;

  constructor(repositories: RepositoryDependencies) {
    this.channelService = new ChannelService(
      repositories.getChatRoom().getChannelRepository()
    );
    this.postService = new PostService(
      repositories.getPosting().getPostRepository(),
      repositories.getProfile().getProfileRepository(),
      repositories.getUpload().getProfileRepository()
    );
    this.snugService = new SnugService(
      repositories.getSnug().getSnugRepository()
    );
    this.authService = new AuthService(repositories.getAuth());
    this.userService = new UserService(
      repositories.getUser().getUserRepository()
    );
    this.inviteService = new InviteService(
      repositories.getInvite().getInviteRepository()
    );
    this.profileService = new ProfileService(
      repositories.getProfile().getProfileRepository()
    );
  }
}
