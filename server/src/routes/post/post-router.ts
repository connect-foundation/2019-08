import { Router } from "express";
import * as PostApiController from "../../controller/api/post-controller";
import replyRouter from "./reply/reply-router";
import { upload } from "../../utils/file-uploader";

const router = Router({ mergeParams: true });

router.use("/:postId", replyRouter);
router.post("/", upload.single(""), PostApiController.create);

export default router;
