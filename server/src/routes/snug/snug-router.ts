import { Router } from "express";
import { create, findByUserId } from "../../controller/api/snug-controller";
import channelRouter from "./channel/channel-router";
import inviteRouter from "./invite/invite-router";
import {isNumeric} from "../../validator/identifier-validator";

const router = Router({mergeParams: true});

router.use("/:snugId/channels", channelRouter);

router.use("/:snugId/invite", inviteRouter);

router.route("/")
        .get(findByUserId)
        .post(create);

router.param("snugId", isNumeric);
export default router;