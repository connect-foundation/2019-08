import { ProfileInfo } from "../profile/profile-info";
import _ from "lodash";
import { Post } from "../../domain/entity/Post";
import { Room } from "../../domain/entity/Room";

export class PostInfo {
  private readonly id: string;
  private readonly contents: string;
  private readonly imgSrc: string;
  private readonly profile: ProfileInfo;
  private readonly room: Room;
  private readonly parent: Post;
  private readonly replyCount: number;
  private readonly updatedAt: Date;

  private constructor(
    id: string,
    contents: string,
    imgSrc: string,
    profile: ProfileInfo,
    room: Room,
    parent: Post,
    repliesCount: number,
    updatedAt: Date
  ) {
    this.id = id;
    this.contents = contents;
    this.imgSrc = imgSrc;
    this.profile = _.cloneDeep(profile);
    this.room = _.cloneDeep(room);
    this.parent = _.cloneDeep(parent);
    this.replyCount = repliesCount;
    this.updatedAt = updatedAt;
  }

  private static calculateReplyCount(replyCount?: number): number {
    return !!replyCount ? replyCount - 1 : replyCount;
  }

  public static fromPost(post: Post, replyCount?: number): PostInfo {
    const { id, contents, imgSrc, profile, room, parent, updatedAt } = post;
    const _replyCount = PostInfo.calculateReplyCount(replyCount);
    return new PostInfo(
      id.toString(),
      contents,
      imgSrc,
      ProfileInfo.fromProfile(profile),
      room,
      parent,
      _replyCount,
      updatedAt
    );
  }
}
