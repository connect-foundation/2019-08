import {Request, Response} from "express";
import * as path from "path";

export const index = (request: Request, response: Response): void => {
  response.sendFile("index.html", { root: path.join(__dirname, "../../public") });
};