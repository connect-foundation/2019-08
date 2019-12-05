import { RepositoryDependencies } from "@context/repositories/index";
import { ChannelService } from "core/service/channel-service";
import { PostService } from "core/service/post-service";
import {InviteService} from "core/service/invite-service";

export class ServiceDependencies {
  readonly channelService: ChannelService;
  readonly postService: PostService;
  readonly inviteService: InviteService;

  constructor(repositories: RepositoryDependencies) {
    this.channelService = new ChannelService(
      repositories.getChatRoom().getChannelRepository()
    );
    this.postService = new PostService(
      repositories.getPosting().getPostRepository()
    );
    this.inviteService = new InviteService(
            repositories.getInvite().getInviteRepository()
    );
  }
}
