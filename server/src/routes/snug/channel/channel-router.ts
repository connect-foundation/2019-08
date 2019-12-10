import { Router } from "express";
import * as ChannelApiController from "../../../controller/api/channel-controller";

const router = Router({mergeParams: true});

router.get("/", ChannelApiController.findAll);
export default router;