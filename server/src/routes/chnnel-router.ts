import {Router} from "express";
import * as ChannelApiController from "../controllers/apis/channel-api-controller";

const router = Router();
router.get("/:name", ChannelApiController.find);
export default router;