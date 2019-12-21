import path from "path";
import dotenv from "dotenv";
const config =
        process.env.NODE_ENV === "production" ? ".env.production" : ".env.local";
dotenv.config({path: path.join(__dirname, "..", config)});
import Application from "./app";
import {Express} from "express";
import http from "http";
import https from "https";
import {initialize} from "./socket/socket-manager";
import {initializeMailManger} from "./mail/mail-manager";
import fs from "fs";
import HttpHelper from "./utils/http-helper";
import logger from "./utils/logger";

const applyHttps = (app: Express): boolean => {
  if(HttpHelper.isSupportedHttps()) {
    const keyPath = process.env.KEY_DIR;
    const encoding = "utf8";
    const key = fs.readFileSync(path.join(__dirname, keyPath, process.env.PRIVATE_KEY), encoding);
    const cert = fs.readFileSync(path.join(__dirname, keyPath, process.env.CERT_KEY), encoding);
    const ca = fs.readFileSync(path.join(__dirname, keyPath, process.env.CA_KEY), encoding);
    const options = {key, cert, ca};
    const server = https
            .createServer(options, app)
            .listen(443, () => initialize(server));
    return true;
  }

  return false;
};

Application.start().then((app: Express) => {
  const server: http.Server = app.listen(app.get("port"), () => {
    logger.info("listen port", app.get("port"));
    initializeMailManger();
    const isAppliedHttps = applyHttps(app);
    if (!isAppliedHttps) {
      initialize(server);
    }
  });
});
