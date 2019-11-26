import {Request, Response} from "express";
import {Post} from "../../entity/Post";

/**
 *
 * channel id 에 해당하는 posts 조회
 *
 * @param request
 * @param response
 *
 * */
export const findByChannelId = async (request: Request, response: Response) => {
  const {id} = request.params;
  const posts = await Post.findByChannelId(id);
  return response
          .status(200)
          .json({message: "ok", payload: {posts: [...posts]}});
};