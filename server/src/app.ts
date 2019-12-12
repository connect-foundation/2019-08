import dotenv from "dotenv";
import "reflect-metadata";
import express, { Express } from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import apiRouter from "./routes/apiRouter";
import indexRouter from "./routes/index";
import {
  notFoundHandler,
  errorResopnseHandler
} from "./middleware/errorHandler";
import { Connection, createConnection } from "typeorm";
import {
  initializeTransactionalContext,
  patchTypeORMRepositoryWithBaseRepository
} from "typeorm-transactional-cls-hooked";

export default class App {
  private static app: Express;
  private static connection: Connection;

  static async start() {
    dotenv.config({ path: __dirname.concat("/../") });
    return await createConnection()
      .then(connection => {
        this.connection = connection;
        this.setUpTransactions();
        return this.initializeExpress();
      })
      .catch(error => console.error("TypeORM Connection Error: ", error));
  }

  private static initializeExpress() {
    this.app = express();
    this.app.set("port", process.env.PORT || 3000);
    this.app.set("env", process.env.NODE_ENV);
    if (process.env.NODE_ENV === "production") {
      this.app.use(morgan("combined"));
    } else {
      this.app.use(morgan("dev"));
    }

    this.app.use(express.static("/"));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(cookieParser(process.env.COOKIE_SECRET));
    this.app.use("/api", apiRouter);
    this.app.use("/", indexRouter);
    this.app.use(notFoundHandler);
    this.app.use(errorResopnseHandler);

    return this.app;
  }

  static getEntityManager() {
    return this.connection.manager;
  }

  static setUpTransactions(): void {
    initializeTransactionalContext();
    patchTypeORMRepositoryWithBaseRepository();
  }
}
