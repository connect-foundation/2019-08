import {Channel} from "../../entity/Channel";
import {Request, Response} from "express";

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
  const channel = await Channel.findByName(name);
  if (!!channel) {
    return response
            .status(200)
            .json({
              message: "ok",
              payload: channel
            });
  } else {
    return response
            .status(404)
            .json({
              message: "not found",
              payload: {}
            });
  }
};