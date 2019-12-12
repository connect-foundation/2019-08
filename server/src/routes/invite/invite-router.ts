import {Router} from "express";
import * as InviteApiController from "../../controller/api/invite-controller";

const router = Router({mergeParams: true});

router.route("/:ticket")
        .post(InviteApiController.verify, InviteApiController.responseBySnug);

export default router;
