import  {Request, Response, NextFunction } from "express";
import HttpException from "../exception/HttpException";

export default function errorHandler(error: HttpException, request: Request, response: Response, next: NextFunction) {
    const status = error.status || 404;
    const message = error.message || 'Something went wrong';
    response.status(status)
      .send({
        message,
        status,
      });
};
