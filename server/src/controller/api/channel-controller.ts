import { Profile } from "./../../domain/entity/Profile";
import { ParticipateIn } from "./../../domain/entity/ParticipateIn";
import { offerProfileTokenInfo } from "./../../validator/identifier-validator";
import { Room } from "../../domain/entity/Room";
import { NextFunction, Request, Response } from "express";
import ResponseForm from "../../utils/response-form";
import {
  CONFLICT,
  CREATED,
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
  OK
} from "http-status-codes";
import {
  ALREADY_EXIST_CHANNEL,
  CREATE_CHANNEL,
  FOUND_CHANNEL,
  FOUND_CHANNELS,
  NOT_FOUND_CHANNEL,
  NOT_FOUND_CHANNELS
} from "./common/messages";
import HttpException from "../../utils/exception/HttpException";
import { Snug } from "../../domain/entity/Snug";

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
    return response
      .status(OK)
      .json(ResponseForm.of<Room>(FOUND_CHANNEL, channel));
  } else {
    return response.status(NOT_FOUND).json(ResponseForm.of(NOT_FOUND_CHANNEL));
  }
};

export const findAll = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const { snugId } = request.params;
    const exSnug = await Snug.findOne({ where: { id: snugId } });

    const channels = await Room.find({ where: { snug: exSnug } });
    if (!!channels) {
      return response
        .status(OK)
        .json(ResponseForm.of<Room[]>(FOUND_CHANNELS, channels));
    } else {
      next(new HttpException(NOT_FOUND_CHANNELS, NOT_FOUND));
    }
  } catch (error) {
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
  const { title, description, privacy, snugId } = request.body;

  const isExisting = await Room.findByTitle(title);

  if (!!isExisting) {
    return response
      .status(CONFLICT)
      .json(ResponseForm.of(ALREADY_EXIST_CHANNEL));
  }
  const snug = await Snug.findOne({ where: { id: snugId } });
  const channel = await Room.create({
    title: title,
    description: description,
    isPrivate: privacy,
    isChannel: true,
    snug: snug
  }).save();

  return response
    .status(CREATED)
    .json(ResponseForm.of<Room>(CREATE_CHANNEL, channel));
};

export const join = async (request: Request, response: Response) => {
  try {
    const payload: any = <object>offerProfileTokenInfo(request);
    const { channelId } = request.body;
    const result = await ParticipateIn.create({
      room: { id: channelId },
      participant: { id: payload.id }
    }).save();
    if (!result) throw new Error("조인실패");
    response.status(OK).json(ResponseForm.of("성공", result));
  } catch (error) {
    response.status(NOT_FOUND).json(ResponseForm.of(error.message));
  }
};
