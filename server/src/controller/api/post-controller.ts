import { Post } from "../../domain/entity/Post";
import { Request, Response } from "express";
import { Paginator } from "./common/pagenation/paginator";
import ResponseForm from "../../utils/response-form";
import { publishIO } from "../../socket/socket-manager";
import { Profile } from "../../domain/entity/Profile";
import { CREATED, NOT_FOUND, OK } from "http-status-codes";
import {
  FOUND_CHANNEL,
  FOUND_POST_PROFILE,
  NOT_FOUND_PROFILE
} from "./common/messages";
import { PUBLISH_EVENT } from "../../socket/common/events/publish-type";
import { Page } from "./common/pagenation/strategy/page";
import { IdPage } from "./common/pagenation/strategy/id-page";
import { DefaultPage } from "./common/pagenation/strategy/default-page";

/**
 *
 * client에서 보내온 메시지를 기반으로 post를 DB에 저장
 *
 * @param request
 * @param response
 *
 */
export const create = async (request: Request, response: Response) => {
  const { profileId, contents, roomId } = request.body;
  console.log(request.body);

  try {
    const profile = await Profile.findOneOrFail(profileId);
    const post = await Post.save({
      contents,
      profile: profile,
      room: roomId
    } as Post);
    const responseForm = ResponseForm.of<Post>(FOUND_POST_PROFILE, post);
    publishIO()
      .of("/snug")
      .to(roomId)
      .emit(PUBLISH_EVENT.SEND_MESSAGE, responseForm);
    return response.status(CREATED).json(responseForm);
  } catch (error) {
    return response.status(NOT_FOUND).json(ResponseForm.of(NOT_FOUND_PROFILE));
  }
};

/**
 *
 * post id 존재 여부에 따라 페이징 전략 선택
 *
 * @param postId
 * @param size
 *
 */
const choosePage = (postId: number, size: number): Page => {
  return !!postId ? new IdPage(postId, size) : new DefaultPage(0, size);
};

/**
 *
 * channel id 에 해당하는 posts 조회
 *
 * @param request
 * @param response
 *
 */
export const findByChannelId = async (request: Request, response: Response) => {
  const { channelId } = request.params;
  const { postId, size, order } = request.query;

  const page: Page = choosePage(postId, size);
  const paginator = new Paginator(page).addOrder("id", order);

  const posts = await Post.findByChannelId(channelId, paginator);
  return response.status(OK).json(
    ResponseForm.of<object>(FOUND_CHANNEL, { posts: posts.reverse() })
  );
};
