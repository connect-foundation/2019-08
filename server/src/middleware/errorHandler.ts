import { Request, Response, NextFunction } from "express";
import HttpException from "../utils/exception/HttpException";
import ResponseForm from "../utils/response-form";
import logger from "../utils/logger";

export function notFoundHandler(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const notFoundError = new HttpException("not found url request", 404);
  logger.error(notFoundError.message);
  next(notFoundError);
}

export function errorResopnseHandler(
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction
) {
  const status = (error as HttpException).status || 500;
  const message =
    request.app.get("env") === "production"
      ? error.name
      : error.message || "Something went wrong";

  logger.error(error.message);
  response.status(status).json(ResponseForm.of(message));
}
