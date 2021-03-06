import {Router} from "express";
import * as AuthApiController from "../../controller/api/auth-controller";
import {isNumericSnugId} from "../../middleware/validator";
import {isVerifyLogined} from "../../validator/identifier-validator";

const router = Router();

router.post("/login", AuthApiController.login);

router.post(
  "/logout",
  isVerifyLogined,
  AuthApiController.logout
);

router.get("/snugs/:snugId/profiles", AuthApiController.getProfileToken);

router.param("snugId", isNumericSnugId);

export default router;
