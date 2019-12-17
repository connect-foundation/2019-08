import {Request, Response} from "express";
import ResponseForm from "../../utils/response-form";
import {CREATED, NOT_FOUND, OK} from "http-status-codes";
import {
  CREATE_POST,
  CREATE_REPLY,
  INVALID_POST_REQUEST,
  INVALID_REPLY_REQUEST,
  NOT_FOUND_POST,
  NOT_FOUND_POSTS,
  SUCCESS_FOUND_POSTS,
  SUCCESS_FOUND_REPLIES
} from "./common/messages";
import {Chatter} from "../../model/chat/chatter";
import {PostNotifier} from "../../model/notifier/chat/post-notifier";
import {ReplyNotifier} from "../../model/notifier/chat/reply-notifier";
import {PostInfo} from "../../model/chat/post-info";
import {ReplyInfo} from "../../model/chat/reply-info";
import {offerProfileTokenInfo} from "../../validator/identifier-validator";

export const create = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const { id } = offerProfileTokenInfo(request);
  const { contents, roomId, filePath } = request.body;
  try {
    const postNotifier = new PostNotifier(roomId);
    const postInfo = await Chatter.fromPost(postNotifier).post(
      contents,
      id,
      roomId,
      filePath
    );
    return response
      .status(CREATED)
      .json(ResponseForm.of<PostInfo>(CREATE_POST, postInfo));
  } catch (error) {
    return response
      .status(NOT_FOUND)
      .json(ResponseForm.of(INVALID_POST_REQUEST));
  }
};

export const findPosts = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const { channelId } = request.params;
  const { postId, size, order } = request.query;
  try {
    const postInfos = await Chatter.create().findPosts(
      channelId,
      postId,
      size,
      order
    );
    return response.status(OK).json(
      ResponseForm.of<object>(SUCCESS_FOUND_POSTS, { posts: postInfos })
    );
  } catch (error) {
    return response.status(NOT_FOUND).json(
      ResponseForm.of<object>(NOT_FOUND_POSTS, { posts: [] })
    );
  }
};

export const reply = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const { postId } = request.params;
  const { profileId, contents, roomId } = request.body;
  try {
    const replyNotifier = new ReplyNotifier(roomId);
    const postInfo = await Chatter.fromReply(replyNotifier).reply(
      postId,
      profileId,
      contents,
      roomId
    );
    return response
      .status(CREATED)
      .json(ResponseForm.of<PostInfo>(CREATE_REPLY, postInfo));
  } catch (error) {
    return response
      .status(NOT_FOUND)
      .json(ResponseForm.of(INVALID_REPLY_REQUEST));
  }
};

export const findReplies = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const { postId } = request.params;
  try {
    const replyInfo = await Chatter.create().findReplies(postId);
    return response
      .status(OK)
      .json(ResponseForm.of<ReplyInfo>(SUCCESS_FOUND_REPLIES, replyInfo));
  } catch (error) {
    return response.status(NOT_FOUND).json(ResponseForm.of(NOT_FOUND_POST));
  }
};
