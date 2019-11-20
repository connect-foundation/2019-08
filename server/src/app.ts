import "dotenv/config";
import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import "reflect-metadata";
import {createConnection} from "typeorm";
import indexRouter from "./routes/index";

/**
 *
 * express app 설정
 *
 **/
const initialize = () => {
  const app = express();
  app.set("port", process.env.PORT || 3000);
  app.use(morgan("dev"));
  app.use(express.json());
  app.use(express.urlencoded({extended: false}));
  app.use(cookieParser(process.env.COOKIE_SECRET));
  app.use("/", indexRouter);
  app.listen(app.get("port"), () => {
    console.log("listen port 3000");
  });
};
/**
 *
 * TypeOrm Connection 설정
 *
 **/
createConnection()
        .then(initialize)
        .catch(error => console.error("TypeORM Connection Error: ", error));