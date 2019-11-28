import  {Request, Response, NextFunction } from "express";
import HttpException from "../util/HttpException";

export default function errorHandler(error: HttpException, request: Request, response: Response, next: NextFunction) {
    const status = error.status || 404;
    const message = request.app.get("env") === "production" ? error.name : error.message || 'Something went wrong';
    response.status(status)
      .send({
        message,
        payload: {},
      });
};
