import path from "path";
import AWS from "aws-sdk";
import multer from "multer";
import multerS3 from "multer-s3";

const endpoint = "https://kr.object.ncloudstorage.com";
const region = "kr-standard";

AWS.config.update({
  accessKeyId: process.env.S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.S3_SECRET_ACESS_KEY
});

export const upload = multer({
  storage: multerS3({
    s3: new AWS.S3({
      endpoint,
      region
    }),
    bucket: "snug-bucket",
    acl: "public-read",
    key(req, file, cb) {
      cb(null, `${new Date()}${path.basename(file.originalname)}`);
    }
  }),
  limits: { fileSize: 5 * 1024 * 1024 }
});
