import express from "express";
import Controller from "./index/controller";

class App {
    public app: express.Application;

    constructor(controllers: Controller[], port: number) {
        this.app = express();
        this.app.set("port", process.env.PORT || 5000);
        this.initializeMiddlewares();
        this.initializeControllers(controllers);

    }

    public listen() {
        this.app.listen(this.app.get("port"), () => {
            console.log(`App listening on the port ${this.app.get("port")}`);
        });
    }

    private initializeMiddlewares() {
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: true}));
    }

    private initializeControllers(controllers: Controller[]) {
        controllers.forEach((controller) => {
            this.app.use("/", controller.router);
        });
    }
}

export default App;