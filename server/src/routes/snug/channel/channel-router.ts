import { Router } from "express";
import * as ChannelApiController from "../../../controller/api/channel-controller";

const router = Router({ mergeParams: true });

router.use(ChannelApiController.hasSnugById);

/**
 *
 * /api/channels/:name 경로 대한
 * channel controller 의 find() 메소드 호출
 *
 * */
router
  .route("/duplicate/:title")
  .get(ChannelApiController.isAcceptableChannelByTitle);

router.route("/").get(ChannelApiController.findChannels);

export default router;
