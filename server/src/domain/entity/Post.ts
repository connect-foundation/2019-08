import {
  Column,
  Entity,
  getTreeRepository,
  In,
  IsNull,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Tree, TreeChildren, TreeParent
} from "typeorm";
import {Profile} from "./Profile";
import {Room} from "./Room";
import {Base} from "./Base";
import {Paginator} from "../../controller/api/common/pagenation/paginator";
import _ from "lodash";
import {PostInfo} from "../../model/post/post-info";
import {ProfileInfo} from "../../model/profile/profile-info";

@Entity()
@Tree("materialized-path")
export class Post extends Base {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable: true })
  contents: string;
  @Column({ nullable: true })
  imgSrc: string;
  @ManyToOne(type => Profile, { eager: true })
  profile: Profile;
  @ManyToOne(type => Room)
  room: Room;
  @TreeParent()
  parent: Post;
  @TreeChildren()
  children: Post[];

  static async findByChannelId(
    channelId: string,
    cacheKey: string,
    paginator: Paginator
  ): Promise<PostInfo[]> {
    paginator.addOptions({
      where: { parent: IsNull(), room: channelId }
      // cache: { id: cacheKey }
    });

    const posts = await this.find(paginator.support());
    return Promise.all(posts.map(async post => PostInfo.fromPost(post, await getTreeRepository(Post).countDescendants(post))));
  }

  static generateCacheKeyByPosts(roomId: string, postId: string): string {
    const separator = "-";
    return _.join(["room", roomId, "post", postId], separator);
  }
}
