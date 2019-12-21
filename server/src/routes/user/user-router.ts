import { Router } from "express";
import inviteRouter from "./invite/invite-router";
import * as UserApiController from "../../controller/api/user-controller";
import {
  hasEmailFormat,
  isNumericUserId,
  isValidUserForm
} from "../../middleware/validator";

const router = Router({ mergeParams: true });

router.route("/").post(isValidUserForm, UserApiController.create);

router
  .route("/emails/duplicate/:email")
  .get(UserApiController.isAcceptableEmail);

router.use("/:userId/invite", inviteRouter);

router.param("userId", isNumericUserId);

router.param("email", hasEmailFormat);

export default router;
