import {ParticipateIn} from "./../../domain/entity/ParticipateIn";
import {offerProfileTokenInfo} from "./../../validator/identifier-validator";
import {Room} from "../../domain/entity/Room";
import {NextFunction, Request, Response} from "express";
import ResponseForm from "../../utils/response-form";
import {CONFLICT, CREATED, INTERNAL_SERVER_ERROR, NOT_ACCEPTABLE, NOT_FOUND, OK} from "http-status-codes";
import {
  ACCEPTABLE_CHANNEL_TITLE,
  ALREADY_EXIST_CHANNEL,
  CREATE_CHANNEL,
  FOUND_CHANNELS,
  NOT_ACCEPTABLE_CHANNEL_TITLE,
  NOT_FOUND_CHANNEL,
  NOT_FOUND_CHANNELS,
  SUCCESS_JOIN_CHANNEL
} from "./common/messages";
import HttpException from "../../utils/exception/HttpException";
import {Snug} from "../../domain/entity/Snug";
import {Participant} from "../../model/participant/participant";
import _ from "lodash";

/**
 *
 * title 기준으로 channel 조회
 *
 * @param request
 * @param response
 *
 * */
export const isAcceptableChannelByTitle = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const { snugId, title } = request.params;
  const channel = await Room.findByTitleAndSnugId(title, snugId);

  const hasNotChannels = _.isNil(channel);
  if (hasNotChannels) {
    return response.status(OK).json(ResponseForm.of(ACCEPTABLE_CHANNEL_TITLE));
  }

  return response
    .status(NOT_ACCEPTABLE)
    .json(ResponseForm.of(NOT_ACCEPTABLE_CHANNEL_TITLE));
};

export const findById = async (
  request: Request,
  response: Response
): Promise<Response> => {
  try {
    const { channelId } = request.params;
    const channel = await Room.findChannelById(Number(channelId));
    return response.status(OK).json(
      ResponseForm.of<object>(FOUND_CHANNELS, { channel })
    );
  } catch (error) {
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
    await Snug.findById(Number(snugId));
    next();
  } catch (error) {
    next(new HttpException(error.message, INTERNAL_SERVER_ERROR));
  }
};

export const findChannels = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<Response> => {
  try {
    const { snugId } = request.params;
    const profile = offerProfileTokenInfo(request);
    const participant = new Participant();
    const channels = await participant.findChannels(profile, Number(snugId));
    return response.status(OK).json(
      ResponseForm.of<object>(FOUND_CHANNELS, { channels })
    );
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
    const channels = await participant.findChannelsAttending(
      profile,
      Number(snugId)
    );

    const hasChannels = !_.isNil(channels);
    if (hasChannels) {
      return response.status(OK).json(
        ResponseForm.of<object>(FOUND_CHANNELS, { channels })
      );
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
export const create = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const { title, description, privacy, snugId } = request.body;

  const profile = offerProfileTokenInfo(request);
  const isExisting = await Room.findByTitleAndSnugId(title, snugId);
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

  return response.status(CREATED).json(
    ResponseForm.of<object>(CREATE_CHANNEL, { channel })
  );
};

export const join = async (
  request: Request,
  response: Response
): Promise<Response> => {
  try {
    const { channelId } = request.body;
    const profile = offerProfileTokenInfo(request);
    const participant = new Participant();
    const participateInfo = await participant.joinRoom(profile, channelId);

    return response.status(CREATED).json(
      ResponseForm.of(SUCCESS_JOIN_CHANNEL, {
        channel: participateInfo.getRoom(),
        participant: participateInfo.getParticipantInfo()
      })
    );
  } catch (error) {
    return response.status(NOT_FOUND).json(ResponseForm.of(error.message));
  }
};
