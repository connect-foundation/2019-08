import { Router } from "express";
import * as IndexController from "../controller/index-controller";
import * as InviteController from "../controller/api/invite-controller";

const router = Router();

router.route("/invite/:ticket")
        .post(InviteController.verify, InviteController.redirectBySnug);

router.get("/", IndexController.index);
export default router;