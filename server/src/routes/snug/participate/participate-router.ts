import {Router} from "express";
import channelRouter from "./channel/channel-router";
import * as ChannelApiController from "../../../controller/api/channel-controller";

const router = Router({mergeParams: true});

router.use(ChannelApiController.hasSnugById);

router.use("/channels", channelRouter);

export default router;