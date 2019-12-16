import { Router } from "express";
import * as PostApiController from "../../controller/api/post-controller";
import replyRouter from "./reply/reply-router";
const router = Router({mergeParams: true});

router.use("/:postId", replyRouter);
router.post("/", PostApiController.create);
export default router;
