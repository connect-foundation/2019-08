import {ParticipateIn} from "./../../domain/entity/ParticipateIn";
import {offerProfileTokenInfo} from "./../../validator/identifier-validator";
import {Room} from "../../domain/entity/Room";
import {NextFunction, Request, Response} from "express";
import ResponseForm from "../../utils/response-form";
import {CONFLICT, CREATED, INTERNAL_SERVER_ERROR, NOT_FOUND, OK} from "http-status-codes";
import {
  ALREADY_EXIST_CHANNEL,
  CREATE_CHANNEL,
  FOUND_CHANNEL,
  FOUND_CHANNELS,
  NOT_FOUND_CHANNEL,
  NOT_FOUND_CHANNELS
} from "./common/messages";
import HttpException from "../../utils/exception/HttpException";
import {Snug} from "../../domain/entity/Snug";
import {Participant} from "../../model/participant/participant";

/**
 *
 * title 기준으로 channel 조회
 *
 * @param request
 * @param response
 *
 * */
export const findByTitle = async (request: Request, response: Response): Promise<Response> => {
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

export const hasSnugById = async (
        request: Request,
        response: Response,
        next: NextFunction
): Promise<void> => {
  try {
    const { snugId } = request.params;
    await Snug.findOneOrFail({ where: { id: snugId } });
    next();
  } catch (error) {
    next(new HttpException(error.message, INTERNAL_SERVER_ERROR));
  }
};

export const findPublicChannels = async (
        request: Request,
        response: Response,
        next: NextFunction
): Promise<Response> => {
  try {
    const { snugId } = request.params;
    const channels = await Participant.findPublicChannels(Number(snugId));
    return response
            .status(OK)
            .json(ResponseForm.of<object>(FOUND_CHANNELS, {channels}));
  } catch (error) {
    next(new HttpException(error.message, INTERNAL_SERVER_ERROR));
  }
};

export const findAllParticipating = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<Response> => {
  try {
    const { snugId } = request.params;
    const profile = offerProfileTokenInfo(request);
    const participant = new Participant();
    const channels = await participant.findChannelsAttending(profile, Number(snugId));
    if (!!channels) {
      return response
        .status(OK)
        .json(ResponseForm.of<object>(FOUND_CHANNELS, {channels}));
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
export const create = async (request: Request, response: Response): Promise<Response> => {
  const { title, description, privacy, snugId } = request.body;

  const profile = offerProfileTokenInfo(request);
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

  await ParticipateIn.create({
    room: { id: channel.id },
    participant: { id: profile.id }
  }).save();

  return response
    .status(CREATED)
    .json(ResponseForm.of<Room>(CREATE_CHANNEL, channel));
};

export const join = async (request: Request, response: Response): Promise<Response> => {
  try {
    const payload = offerProfileTokenInfo(request);
    const { channelId } = request.body;
    const result = await ParticipateIn.create({
      room: { id: channelId },
      participant: { id: payload.id }
    }).save();
    if (!result) throw new Error("조인실패");
    return response.status(OK).json(ResponseForm.of("성공", result));
  } catch (error) {
    return response.status(NOT_FOUND).json(ResponseForm.of(error.message));
  }
};
