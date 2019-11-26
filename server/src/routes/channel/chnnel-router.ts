import {Router} from "express";
import * as ChannelApiController from "../../controller/api/channel-controller";
import PostRouter from "./post/post-router";

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
 *
 * */
router.use("/:id/posts", PostRouter);
export default router;