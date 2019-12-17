import {Router} from "express";
import {create, findByUserId} from "../../controller/api/snug-controller";
import inviteRouter from "./invite/invite-router";
import channelRouter from "./channel/channel-router";
import participateRouter from "./participate/participate-router";
import {isNumericSnugId} from "../../middleware/validator";

const router = Router({ mergeParams: true });

router.route("/")
        .get(findByUserId)
        .post(create);

router.use("/:snugId/channels", channelRouter);

router.use("/:snugId/participates", participateRouter);

router.use("/:snugId/invite", inviteRouter);

router.param("snugId", isNumericSnugId);

export default router;
