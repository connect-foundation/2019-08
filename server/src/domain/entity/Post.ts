import {
  Column,
  Entity,
  getTreeRepository,
  IsNull,
  ManyToOne,
  PrimaryGeneratedColumn,
  Tree,
  TreeChildren,
  TreeParent
} from "typeorm";
import {Profile} from "./Profile";
import {Room} from "./Room";
import {Base} from "./Base";
import {Paginator} from "../../controller/api/common/pagenation/paginator";
import {PostInfo} from "../../model/chat/post-info";
import {Order} from "../../controller/api/common/order";

@Entity()
@Tree("materialized-path")
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
  @TreeParent()
  parent: Post;
  @TreeChildren()
  children: Post[];

  static async findByChannelId(channelId: string, paginator: Paginator): Promise<Post[]> {
    const channel = await Room.findOneOrFail(channelId);
    paginator.addOptions({where: {parent: IsNull(), room: channel}});
    return await this.find(paginator.support());
  }

  static async findRepliesCounts(post: Post): Promise<number> {
    return getTreeRepository(Post).countDescendants(post);
  }

  static async findReplies(parentPost: Post, order: Order): Promise<Post[]> {
    return Post.find({where: {parent: parentPost}, ...order.support()});
  }

  public async asPostInfo(): Promise<PostInfo> {
    return PostInfo.fromPost(this, await Post.findRepliesCounts(this));
  }
}
