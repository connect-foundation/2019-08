import { Router } from "express";
import inviteRouter from "./invite/invite-router";
import * as UserApiController from "../../controller/api/user-controller";
import { isValidUserForm } from "../../middleware/validator";

const router = Router();

router.post("/", isValidUserForm, UserApiController.create);
router.get("/email/:email", UserApiController.findByEmail);
router.use("/:userId/invite", inviteRouter);
export default router;
