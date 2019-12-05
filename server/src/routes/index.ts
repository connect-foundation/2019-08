import { Router } from "express";
import * as IndexController from "../controller/index-controller";

const router = Router();

router.get("/", IndexController.index);
export default router;