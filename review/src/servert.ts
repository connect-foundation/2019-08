
import Application from "./servert";
import {Express} from "express";
import { Server } from "http";
import socketConfig from "./socketConfig"
;
Application.start()
        .then((app: Express) => {
          const server: Server = app.listen(app.get("port"), () => {
            console.log("listen port", app.get("port"));
          });
          socketConfig(server, app);
        });