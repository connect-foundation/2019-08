import {Router} from "express";
import * as ChannelApiController from "../../controller/api/channel-controller";
import PostRouter from "./post/post-router";
import {isNumeric} from "../../middleware/validator";
import {isVerifyProfile} from "../../validator/identifier-validator";

const router = Router({mergeParams: true});

/**
 *
 * /api/channels/:name 경로 대한
 * channel controller 의 find() 메소드 호출
 *
 * */
router.route("/:title")
        .get(ChannelApiController.find);

router.route("/")
        .get(isVerifyProfile, ChannelApiController.findAll)
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
router.param("channelId", isNumeric);
export default router;
