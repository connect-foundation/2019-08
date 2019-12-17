import { Router } from "express";
import { create, findByUserId } from "../../controller/api/snug-controller";
import { isNumeric } from "../../middleware/validator";
import inviteRouter from "./invite/invite-router";
import channelRouter from "./channel/channel-router";
import participateRouter from "./participate/channel/channel-router";

const router = Router({ mergeParams: true });

router.use("/:snugId/channels", channelRouter);
router.use("/:snugId/participates/channels", participateRouter);
router.use("/:snugId/invite", inviteRouter);

router.route("/")
        .get(findByUserId)
        .post(create);

router.param("snugId", isNumeric);
export default router;
