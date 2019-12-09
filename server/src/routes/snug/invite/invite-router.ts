import { Router } from "express";
import * as InviteApiController from "../../../controller/api/invite-controller";

const router = Router({mergeParams: true});

router.post("/", InviteApiController.invite);
export default router;