import HttpException from '../../exception/HttpException';
import {Room} from "../../entity/Room";
import {Request, Response} from "express";
import {Request, Response, NextFunction} from "express";

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
        next(new HttpException(404, "not found"));
    }
    } catch (error){
        next(new HttpException(500, error.message));
    }
};