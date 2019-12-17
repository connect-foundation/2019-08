import { Router } from "express";
import * as ChannelApiController from "../../../../controller/api/channel-controller";
import {isVerifyProfile} from "../../../../validator/identifier-validator";

const router = Router({mergeParams: true});

router.use(isVerifyProfile);

router.route("/")
        .get(ChannelApiController.findAllParticipating);

export default router;