import { Router } from "express";
import {
  uploader,
  fileResponser
} from "../../controller/api/upload-controller";

const router = Router();
router.post("/", uploader.single("file"), fileResponser);

export default router;
