import {Router} from "express";
import * as InviteApiController from "../../../controller/api/invite-controller";
import {isValidInviteForm} from "../../../middleware/validator";
import * as ChannelApiController from "../../../controller/api/channel-controller";

const router = Router({mergeParams: true});

router.use(ChannelApiController.hasSnugById);

router.route("/")
        .post(isValidInviteForm, InviteApiController.invite);

export default router;