import path from "path";
import dotenv from "dotenv";
import Application from "./app";
import {Express} from "express";
import http from "http";
import https from "https";
import {initialize} from "./socket/socket-manager";
import {initializeMailManger} from "./mail/mail-manager";
import fs from "fs";

const config =
        process.env.NODE_ENV === "production" ? ".env.production" : ".env.local";
dotenv.config({path: path.join(__dirname, "..", config)});

const hasNotKey = (): boolean => {
  return !process.env.PRIVATE_KEY || !process.env.CERT_KEY;
};

const applyHttps = (app: Express): boolean => {
  if(hasNotKey()) {
    return false;
  }

  const keyPath = "../.key";
  const key = fs.readFileSync(path.join(__dirname, keyPath, process.env.PRIVATE_KEY), "utf8");
  const cert = fs.readFileSync(path.join(__dirname, keyPath, process.env.CERT_KEY), "utf8");
  const options = {key, cert};
  const server = https
          .createServer(options, app)
          .listen(443, () => initialize(server));
  return true;
};

Application.start().then((app: Express) => {
  const server: http.Server = app.listen(app.get("port"), () => {
    console.log("listen port", app.get("port"));
    initializeMailManger();
    const isNotAppliedHttps = applyHttps(app);
    if (isNotAppliedHttps) {
      initialize(server);
    }
  });
});
