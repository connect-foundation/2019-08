import "dotenv/config";
import "reflect-metadata";
import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import {createConnection} from "typeorm";
import indexRouter from "./routes/index";

createConnection().then(async connection =>{
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
}).catch(error => console.error("TypeORM Connection Error: ", error));