import {Router} from "express";
import * as PostApiController from "../../../controller/api/post-controller";

const router = Router({mergeParams: true});

/**
 *
 * /api/channels/:id/posts 경로 대한
 * post controller findByChannelId() 메소드 호출
 *
 * */
router.get("/", PostApiController.findByChannelId);
export default router;