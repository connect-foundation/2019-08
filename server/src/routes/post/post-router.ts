import { Router } from "express";
import * as PostApiController from "../../controller/api/post-controller";
import { upload } from "../../utils/file-uploader";

const router = Router();

router.post("/", upload.single(""), PostApiController.create);
export default router;
