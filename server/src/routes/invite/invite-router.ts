import {Router} from "express";
import * as InviteApiController from "../../controller/api/invite-controller";

const router = Router({mergeParams: true});

router.route("/:ticket")
        .get(InviteApiController.verify);

export default router;
