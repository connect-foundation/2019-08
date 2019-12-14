import {ProfileInfo} from "../profile/profile-info";
import _ from "lodash";
import {Post} from "../../domain/entity/Post";

export class PostInfo {
  private readonly id: string;
  private readonly contents: string;
  private readonly imgSrc: string;
  private readonly profile: ProfileInfo;
  private readonly repliesCount: number;
  private readonly updatedAt: Date;


  private constructor(
          id: string,
          contents: string,
          imgSrc: string,
          profile: ProfileInfo,
          repliesCount: number,
          updatedAt: Date
  ) {
    this.id = id;
    this.contents = contents;
    this.imgSrc = imgSrc;
    this.profile = _.cloneDeep(profile);
    this.repliesCount = repliesCount;
    this.updatedAt = updatedAt;
  }

  public static fromPost(post: Post, repliesCount: number): PostInfo {
    const {id,
      contents,
      imgSrc,
      profile,
      updatedAt} = post;

    return new PostInfo(id.toString(), contents, imgSrc, ProfileInfo.fromProfile(profile), repliesCount, updatedAt);
  }
}