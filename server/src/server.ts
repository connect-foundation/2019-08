import "dotenv/config";
import App from "./app";
import IndexController from "./index/index.controller";

const app = new App([
    new IndexController(),
], 5000);
app.listen()
