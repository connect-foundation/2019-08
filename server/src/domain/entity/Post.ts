import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Profile} from "./Profile";
import {Room} from "./Room";
import {Base} from "./Base";
import {Paginator} from "../../controller/api/common/pagenation/paginator";
import _ from "lodash";

@Entity()
export class Post extends Base {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({nullable: true})
  contents: string;
  @Column({nullable: true})
  imgSrc: string;
  @ManyToOne(type => Profile, {eager: true})
  profile: Profile;
  @ManyToOne(type => Room)
  room: Room;
  @ManyToOne(
          type => Post,
          post => post.childCategories
  )
  parentCategory: Post;
  @OneToMany(
          type => Post,
          post => post.parentCategory
  )
  childCategories: Post[];

  static findByChannelId(channelId: string, cacheKey: string, paginator: Paginator): Promise<Post[]> {
    paginator.addOptions({where: {room: channelId}, cache: {id: cacheKey}});
    return this.find(paginator.support());
  }

  static generateCacheKeyByPosts(roomId: string, postId: string): string {
    const separator = "-";
    return _.join(["room", roomId, "post", postId], separator);
  }
}