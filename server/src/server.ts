import path from "path";
import dotenv from "dotenv";
const config =
  process.env.NODE_ENV === "production" ? ".env.production" : ".env.local";
dotenv.config({ path: path.join(__dirname, "..", config) });

import Application from "./app";
import { Express } from "express";
import { Server } from "http";
import { initialize } from "./socket/socket-manager";
import { initializeMailManger } from "./mail/mail-manager";

Application.start().then((app: Express) => {
  const server: Server = app.listen(app.get("port"), () => {
    console.log("listen port", app.get("port"));
    initialize(server);
    initializeMailManger();
  });
});
