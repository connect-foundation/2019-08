import {Router} from "express";
import * as ChannelApiController from "../../../controller/api/channel-controller";

const router = Router({mergeParams: true});

router.use(ChannelApiController.hasSnugById);

/**
 *
 * /api/channels/:name 경로 대한
 * channel controller 의 find() 메소드 호출
 *
 * */
router.route("/:title")
        .get(ChannelApiController.findByTitle);

router.route("/")
        .get(ChannelApiController.findPublicChannels);

export default router;