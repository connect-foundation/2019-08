import {Post} from "../../entity/Post";
import {Request, Response} from "express";
import {Paginator} from "./common/paginator";

/**
 *
 * client에서 보내온 메시지를 기반으로 post를 DB에 저장
 *
 * @param request
 * @param response
 *
 * */
export const create = async (request: Request, response: Response) => {
  const profileId = request.body.profileId;
  const contents = request.body.contents;
  try {
    const post = await Post.create({ contents, profile: profileId }).save();

    const returnValue = await Post.find({
      select: ["id", "contents", "imgSrc", "profile"],
      where: {
        id: post.id
      },
      relations: ["profile"]
    });
    return response.status(201).json({
      message: "ok",
      payload: {
        returnValue
      }
    });
  } catch (error) {
    return response.status(404).json({
      message: error.message,
      payload: {}
    });
  }
};

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
  const pageable = new Paginator(request.query)
          .addOrder("id", request.query.order)
          .support();
  const posts = await Post.findByChannelId(id, pageable);
  return response
          .status(200)
          .json({message: "ok", payload: {posts: [...posts]}});
};