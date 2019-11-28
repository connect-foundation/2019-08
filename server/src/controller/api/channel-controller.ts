import {Room} from "../../entity/Room";
import {Request, Response} from "express";
import ResponseForm from "../../utils/response-form";
import {CONFLICT, CREATED, NOT_FOUND} from "./common/status-code";

/**
 *
 * title 기준으로 channel 조회
 *
 * @param request
 * @param response
 *
 * */
export const find = async (request: Request, response: Response) => {
  const title = request.params.title;
  const channel = await Room.findByTitle(title);
  if (!!channel) {
    return response.status(CREATED).json(ResponseForm.of<Room>("ok", channel));
  } else {
    return response.status(NOT_FOUND).json(ResponseForm.of("not found"));
  }
};

/**
 *
 * name 기준으로 channel 생성
 * 중복된 name로 channel을 생성하지 못한다.
 *
 * @param request
 * @param response
 *
 * */
export const create = async (request: Request, response: Response) => {
  const title = request.body.title;
  const description = request.body.description;
  const privacy = request.body.privacy;

  const isExisting = await Room.findByTitle(title);

  if (!!isExisting) {
    return response.status(CONFLICT).json(ResponseForm.of("given channel title already exists"));
  }

  const channel = await Room.create({
    title: title,
    description: description,
    isPrivate: privacy,
    isChannel: true
  }).save();

  return response.status(CREATED).json(ResponseForm.of<Room>("ok", channel));
};