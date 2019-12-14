import {Post} from "../../domain/entity/Post";
import {Room} from "../../domain/entity/Room";
import {Profile} from "../../domain/entity/Profile";
import {Order} from "../../controller/api/common/order";

export class Chatter {
  public async reply(parentPostId: string, profileId: string, contents: string, roomId: string): Promise<Post> {
    const post = new Post();
    post.contents = contents;
    post.room = await Room.findOneOrFail(roomId);
    post.profile = await Profile.findOneOrFail(profileId);
    post.parent = await Post.findOneOrFail(parentPostId);
    return post.save();
  }

  public async findReplies(parentPostId: string): Promise<object> {
    const post = await Post.findOneOrFail(parentPostId);
    const order = new Order()
            .add("id", "ASC");
    const replies = await Post.find({where: {parent: parentPostId}, ...order.support()});
    return {
      post,
      replies
    };
  }
}