import { Post } from "../../entity/Post";
import { Request, Response } from "express";
import { Paginator } from "./common/paginator";
import ResponseForm from "../../utils/response-form";
import { publishIO } from "../../socket/socket-manager";
import { Profile } from "../../entity/Profile";
import { CREATED, NOT_FOUND, OK } from "./common/status-code";
import {
  FOUND_CHANNEL,
  FOUND_POST_PROFILE,
  NOT_FOUND_PROFILE
} from "./common/error-message";
import { PUBLISH_EVENT } from "../../socket/common/events/publish-type";

/**
 *
 * client에서 보내온 메시지를 기반으로 post를 DB에 저장
 *
 * @param request
 * @param response
 *
 * */
export const create = async (request: Request, response: Response) => {
  const { profileId, contents, roomId } = request.body;
  console.log(request.body);

  try {
    const profile = await Profile.findOneOrFail(profileId);
    const post = await Post.save({ contents, profile: profile, room: roomId } as Post);
    const responseForm = ResponseForm.of<Post>(FOUND_POST_PROFILE, post);
    publishIO().emit(PUBLISH_EVENT.SEND_MESSAGE, responseForm);
    return response.status(CREATED).json(responseForm);
  } catch (error) {
    return response.status(NOT_FOUND).json(ResponseForm.of(NOT_FOUND_PROFILE));
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
  const { id } = request.params;
  const pageable = new Paginator(request.query)
    .addOrder("id", request.query.order)
    .support();
  const posts = await Post.findByChannelId(id, pageable);
  return response.status(OK).json(
    ResponseForm.of<object>(FOUND_CHANNEL, { posts: posts })
  );
};
