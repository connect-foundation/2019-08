import {Request, Response} from "express";

export const index = (request: Request, response: Response) => {
  response.sendFile("/index.html");
};