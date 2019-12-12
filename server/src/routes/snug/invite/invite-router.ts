import { Router } from "express";
import * as InviteApiController from "../../../controller/api/invite-controller";
import {isValidInviteForm} from "../../../middleware/validator";

const router = Router({mergeParams: true});

router.post("/", isValidInviteForm, InviteApiController.invite);
export default router;