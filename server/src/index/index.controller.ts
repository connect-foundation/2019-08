import express from "express";
import Controller from "./controller";

const router = express.Router();

class IndexController implements Controller {
    path= "";
    router= express.Router();

    constructor() {
        this.initializeRouter();

    }

    private initializeRouter() {
        /* GET home page. */
        this.router.get("/", function (req: express.Request, res: express.Response) {
            res.json("test");

        });
    }

}


export default IndexController;
