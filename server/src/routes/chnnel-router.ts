import { Router } from "express";
import * as ChannelApiController from "../controller/apis/channel-api-controller";

const router = Router();

router.get("/:title", ChannelApiController.find);
router.get("/", ChannelApiController.findAll);
router.post("/", ChannelApiController.create);

export default router;
