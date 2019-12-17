import { ProfileInfo } from "../profile/profile-info";
import _ from "lodash";
import { Post } from "../../domain/entity/Post";
import { Room } from "../../domain/entity/Room";

export class PostInfo {
  private readonly id: string;
  private readonly contents: string;
  private readonly filePath: string;
  private readonly profile: ProfileInfo;
  private readonly room: Room;
  private readonly parent: Post;
  private readonly replyCount: number;
  private readonly updatedAt: Date;
  private readonly createdAt: Date;

  private constructor(
    id: string,
    contents: string,
    filePath: string,
    profile: ProfileInfo,
    room: Room,
    parent: Post,
    repliesCount: number,
    createdAt: Date,
    updatedAt: Date
  ) {
    this.id = id;
    this.contents = contents;
    this.filePath = filePath;
    this.profile = _.cloneDeep(profile);
    this.room = _.cloneDeep(room);
    this.parent = _.cloneDeep(parent);
    this.replyCount = repliesCount;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  private static calculateReplyCount(replyCount?: number): number {
    return !!replyCount ? replyCount - 1 : replyCount;
  }

  public static fromPost(post: Post, replyCount?: number): PostInfo {
    const {
      id,
      contents,
      filePath,
      profile,
      room,
      parent,
      updatedAt,
      createdAt
    } = post;
    const _replyCount = PostInfo.calculateReplyCount(replyCount);
    return new PostInfo(
      id.toString(),
      contents,
      filePath,
      ProfileInfo.fromProfile(profile),
      room,
      parent,
      _replyCount,
      createdAt,
      updatedAt
    );
  }
}
