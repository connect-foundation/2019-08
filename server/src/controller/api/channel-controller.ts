import {Room} from "../../domain/entity/Room";
import {NextFunction, Request, Response} from "express";
import ResponseForm from "../../utils/response-form";
import {CONFLICT, CREATED, INTERNAL_SERVER_ERROR, NOT_FOUND, OK} from "./common/status-code";
import {
  ALREADY_EXIST_CHANNEL,
  CREATE_CHANNEL,
  FOUND_CHANNEL,
  FOUND_CHANNELS,
  NOT_FOUND_CHANNEL, NOT_FOUND_CHANNELS
} from "./common/error-message";
import HttpException from "../../util/HttpException";

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
    return response.status(OK).json(ResponseForm.of<Room>(FOUND_CHANNEL, channel));
  } else {
    return response.status(NOT_FOUND).json(ResponseForm.of(NOT_FOUND_CHANNEL));
  }
};

export const findAll = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const channels = await Room.find();
    if (!!channels) {
      return response
              .status(OK)
              .json(ResponseForm.of<Room[]>(FOUND_CHANNELS, channels));
    } else {
      next(new HttpException(NOT_FOUND_CHANNELS, NOT_FOUND));
    }
  } catch (error){
    next(new HttpException(error.message, INTERNAL_SERVER_ERROR));
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
    return response.status(CONFLICT).json(ResponseForm.of(ALREADY_EXIST_CHANNEL));
  }

  const channel = await Room.create({
    title: title,
    description: description,
    isPrivate: privacy,
    isChannel: true
  }).save();

  return response.status(CREATED).json(ResponseForm.of<Room>(CREATE_CHANNEL, channel));
};