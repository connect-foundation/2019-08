import Application from "./app";
import {Express} from "express";

Application.start()
        .then((app: Express) => {
          app.listen(app.get("port"), () => {
            console.log("listen port", app.get("port"));
          });
        });