import { Router } from "express";
import * as ChannelApiController from "../../../controller/api/channel-controller";

const router = Router({mergeParams: true});

router.use(ChannelApiController.hasSnugById);
router.route("/")
        .get(ChannelApiController.findPublicChannels);

export default router;