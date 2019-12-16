import { Router } from "express";
import * as PostApiController from "../../../controller/api/post-controller";

const router = Router({mergeParams: true});

router.route("/replies")
        .get(PostApiController.findReplies)
        .post(PostApiController.reply);

export default router;
