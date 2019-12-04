import { Snug } from "../../entity/Snug";
import { NextFunction, Request, Response } from "express";
import ResponseForm from "../../utils/response-form";
import {CONFLICT, CREATED, INTERNAL_SERVER_ERROR, NOT_FOUND, OK} from "./common/status-code";
import {
  ALREADY_EXIST_CHANNEL,
  CREATE_CHANNEL,
  FOUND_CHANNEL,
  FOUND_CHANNELS
} from "./common/error-message";

/**
 *
 * client에서 보내온 메시지를 기반으로 post를 DB에 저장
 *
 * @param request
 * @param response
 *
 * */
export const create = async (request: Request, response: Response) => {
    const { name, description, thumbnail } = request.body;

    try {
        const snug: Snug = new Snug();
        snug.name = name;
        snug.description = description;
        snug.thumbnail = thumbnail;

        const result = await Snug.save(snug);
        const responseForm = ResponseForm.of<Snug>("", result);
        response.status(CREATED).json(responseForm)
    } catch (error) {
        return response.status(500).json(ResponseForm.of(error.message));
    }
};