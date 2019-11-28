import { Router } from "express";
import * as PostApiController from "../../controller/api/post-controller";

const router = Router();

router.post("/", PostApiController.create);
export default router;
