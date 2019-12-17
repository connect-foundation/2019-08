import {Router} from "express";
import * as ChannelApiController from "../../controller/api/channel-controller";
import PostRouter from "./post/post-router";
import {isNumericSnugId} from "../../middleware/validator";

const router = Router({mergeParams: true});

router.route("/:channelId")
        .get(ChannelApiController.findById);

router.route("/")
        .post(ChannelApiController.create);

/**
 *
 * /api/channels/:id/posts 경로 매핑
 *
 * */
router.use("/:channelId/posts", PostRouter);

router.post("/join", ChannelApiController.join);

/**
 *
 * isNumber() 메소드에서 path variable 인 id 대한 유효성 검사
 *
 * */
router.param("channelId", isNumericSnugId);
export default router;
