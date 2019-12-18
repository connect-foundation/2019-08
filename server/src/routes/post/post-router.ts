import { Router } from "express";
import * as PostApiController from "../../controller/api/post-controller";
import replyRouter from "./reply/reply-router";
import {isNumericPostId} from "../../middleware/validator";

const router = Router({ mergeParams: true });

router.use("/:postId", replyRouter);

router.route("/")
        .post(PostApiController.create);

router.param("postId", isNumericPostId);

export default router;
