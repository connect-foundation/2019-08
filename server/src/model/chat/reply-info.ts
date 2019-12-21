import _ from "lodash";
import {Post} from "../../domain/entity/Post";
import {PostInfo} from "./post-info";

export class ReplyInfo {
  private readonly post: PostInfo;
  private readonly replies: PostInfo[];

  private constructor(post: PostInfo, replies: PostInfo[]) {
    this.post = post;
    this.replies = replies;
  }

  public static fromReply(post: Post, replies: Post[]): ReplyInfo {
    const _post = PostInfo.fromPost(post);
    const _replies = _.map(replies, reply => PostInfo.fromPost(reply));
    return new ReplyInfo(_post, _replies);
  }
}