import { Channel } from "../../entity/Channel";
import { Request, Response } from "express";
import App from "../../app";

/**
 *
 * name 기준으로 channel 조회
 *
 * @param request
 * @param response
 *
 * */
export const find = async (request: Request, response: Response) => {
  const name = request.params.name;
  const channel = await Channel.findOne({ where: { name: name } });
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
  const name = request.body.name;
  const description = request.body.description;
  const privacy = request.body.privacy;

  const isExisting = await Channel.findOne({ where: { name: name } });

  if (!!isExisting) {
    return response.status(409).json({
      message: "given channel name already exists",
      payload: {}
    });
  }

  const channel = await Channel.create({
    name,
    description,
    privacy
  }).save();

  return response.status(201).json({
    message: "ok",
    payload: channel
  });
};
