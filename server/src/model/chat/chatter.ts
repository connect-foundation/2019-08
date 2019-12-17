import { Post } from "../../domain/entity/Post";
import { Room } from "../../domain/entity/Room";
import { Profile } from "../../domain/entity/Profile";
import { Order } from "../../controller/api/common/order";
import { Notifier } from "../notifier/notifier";
import { Page } from "../../controller/api/common/pagenation/strategy/page";
import { Paginator } from "../../controller/api/common/pagenation/paginator";
import { IdPage } from "../../controller/api/common/pagenation/strategy/id-page";
import { DefaultPage } from "../../controller/api/common/pagenation/strategy/default-page";
import { PostInfo } from "./post-info";
import { ReplyInfo } from "./reply-info";
import {
  IsolationLevel,
  Propagation,
  Transactional
} from "typeorm-transactional-cls-hooked";
import _ from "lodash";

export class Chatter {
  private readonly postNotifier: Notifier<Post>;
  private readonly replyNotifier: Notifier<Post>;

  private constructor(
    postNotifier?: Notifier<Post>,
    replyNotifier?: Notifier<Post>
  ) {
    this.postNotifier = postNotifier;
    this.replyNotifier = replyNotifier;
  }

  static create(): Chatter {
    return new Chatter(null, null);
  }

  static fromPost(notifier: Notifier<Post>): Chatter {
    return new Chatter(notifier, null);
  }

  static fromReply(notifier: Notifier<Post>): Chatter {
    return new Chatter(null, notifier);
  }

  private async findProfileAndRoom(
    profileId: number,
    roomId: string
  ): Promise<object> {
    return {
      profile: await Profile.findOneOrFail(profileId),
      room: await Room.findOneOrFail(roomId)
    };
  }

  public async post(
    contents: string,
    profileId: number,
    roomId: string,
    filePath: string
  ): Promise<PostInfo> {
    const profileAndRoom = await this.findProfileAndRoom(profileId, roomId);
    const post = await Post.save({
      contents,
      filePath,
      ...profileAndRoom
    } as Post);
    this.postNotifier.send(post);
    return PostInfo.fromPost(post);
  }

  public async reply(
    parentPostId: string,
    profileId: number,
    contents: string,
    roomId: string
  ): Promise<PostInfo> {
    const profileAndRoom = await this.findProfileAndRoom(profileId, roomId);
    const parent = await Post.findOneOrFail(parentPostId);
    const post = await Post.save({
      contents,
      parent,
      ...profileAndRoom
    } as Post);
    this.replyNotifier.send(post);
    return PostInfo.fromPost(post);
  }

  private choosePage(postId: string, size: string): Page {
    const _postId = parseInt(postId);
    const _size = parseInt(size);
    return !!postId ? new IdPage(_postId, _size) : new DefaultPage(0, _size);
  }

  private toPostInfos(posts: Post[]): Promise<PostInfo>[] {
    return _.chain(posts)
      .map(post => post.asPostInfo())
      .value();
  }

  @Transactional({
    propagation: Propagation.REQUIRED,
    isolationLevel: IsolationLevel.READ_COMMITTED
  })
  public async findPosts(
    channelId: string,
    postId: string,
    size: string,
    order: string
  ): Promise<PostInfo[]> {
    const page: Page = this.choosePage(postId, size);
    const paginator = new Paginator(page).addOrder("id", order);
    const posts = await Post.findByChannelId(channelId, paginator);
    const infos = await Promise.all(this.toPostInfos(posts));
    return infos.reverse();
  }

  public async findReplies(parentPostId: string): Promise<ReplyInfo> {
    const parentPost = await Post.findOneOrFail(parentPostId);
    const replies = await Post.findReplies(
      parentPost,
      new Order().add("id", "ASC")
    );
    return ReplyInfo.fromReply(parentPost, replies);
  }
}
