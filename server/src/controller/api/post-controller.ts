import {Post} from "../../entity/Post";
import {Request, Response} from "express";
import {Paginator} from "./common/paginator";
import ResponseForm from "../../utils/response-form";
import {publishIO} from "../../socket/socket-manager";
import {Profile} from "../../entity/Profile";
import {CREATED, NOT_FOUND, OK} from "./common/status-code";

/**
 *
 * client에서 보내온 메시지를 기반으로 post를 DB에 저장
 *
 * @param request
 * @param response
 *
 * */
export const create = async (request: Request, response: Response) => {
  const {profileId, contents, roomId} = request.body;
  try {
    const profile = await Profile.findOneOrFail(profileId);
    const post = await Post.save({contents, profile: profile} as Post);
    const responseForm = ResponseForm.of<Post>("ok", post);
    publishIO().to(`${roomId}`).emit("newPost", responseForm);
    return response.status(CREATED).json(responseForm);
  } catch (error) {
    return response.status(NOT_FOUND).json(ResponseForm.of(`not found profile that has ${profileId}`));
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
          .status(OK)
          .json(ResponseForm.of<Post[]>("ok", [...posts]));
};