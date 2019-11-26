import { Router } from "express";
import * as PostApiController from "../controllers/apis/post-api-controller";

const router = Router();

router.post("/", PostApiController.create);
export default router;
