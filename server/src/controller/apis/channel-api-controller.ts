import HttpException from '../../util/HttpException';
import {Room} from "../../entity/Room";
import {Request, Response, NextFunction} from "express";

/**
 *
 * name 기준으로 channel 조회
 *
 * @param request
 * @param response
 *
 * */
export const find = async (request: Request, response: Response) => {
  const title = request.params.title;
  const channel = await Room.findOne({ where: { title: title, isChannel: true } });
  if (!!channel) {
    return response.status(200).json({
      message: "ok",
      payload: channel
    });
  } else {
    return response.status(404).json({
      message: "not found",
      payload: {}
    });
  }
};

export const findAll = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const channels = await Room.find();
    if (!!channels) {
      return response
              .status(200)
              .json({
                message: "ok",
                payload: channels
              });
    } else {
      next(new HttpException("not found", 404));
    }
  } catch (error){
    next(new HttpException(error.message, 500));
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

  const isExisting = await Room.findOne({ where: { title: title } });

  if (!!isExisting) {
    return response.status(409).json({
      message: "given channel name already exists",
      payload: {}
    });
  }

  const channel = await Room.create({
    title: title,
    description: description,
    isPrivate: privacy,
    isChannel: true
  }).save();

  return response.status(201).json({
    message: "ok",
    payload: channel
  });
};
