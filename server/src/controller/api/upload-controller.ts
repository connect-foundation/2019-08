import path from "path";
import AWS from "aws-sdk";
import multer from "multer";
import multerS3 from "multer-s3";
import { Request, Response, NextFunction } from "express";
import ResponseForm from "../../utils/response-form";
import { FILE_OK, FILE_FAIL } from "./common/messages";
import { CREATED, INTERNAL_SERVER_ERROR } from "http-status-codes";

const endpoint = "https://kr.object.ncloudstorage.com";
const region = "kr-standard";

AWS.config.update({
  accessKeyId: process.env.S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.S3_SECRET_ACESS_KEY
});

export const uploader = multer({
  storage: multerS3({
    s3: new AWS.S3({
      endpoint,
      region
    }),
    bucket: "snug-bucket",
    acl: "public-read",
    key(req, file, cb) {
      cb(null, `${new Date().valueOf()}${path.basename(file.originalname)}`);
    }
  }),
  limits: { fileSize: 50 * 1024 * 1024 }
});

export const fileResponser = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    response
      .status(CREATED)
      .json(ResponseForm.of<string>(FILE_OK, request.file.location));
  } catch (error) {
    response.status(INTERNAL_SERVER_ERROR).json(ResponseForm.of(FILE_FAIL));
  }
};
