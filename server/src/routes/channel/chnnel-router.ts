import {Router} from "express";
import * as ChannelApiController from "../../controller/api/channel-controller";
import PostRouter from "./post/post-router";
import {isNumeric} from "../../validator/identifier-validator";

const router = Router({mergeParams: true});

/**
 *
 * /api/channels/:name 경로 대한
 * channel controller 의 find() 메소드 호출
 *
 * */
router.route("/:name")
        .get(ChannelApiController.find);

/**
 *
 * /api/channels/:id/posts 경로 매핑
 * isNumber() 메소드에서 path variable 인 id 대한 유효성 검사
 *
 * */
router.use("/:id/posts", isNumeric, PostRouter);
export default router;