import {
  isVerifyLogined,
  isVerifyProfile
} from "../../validator/identifier-validator";
import { Router } from "express";
import * as ParticipateInController from "../../controller/api/participate-in-controller";
const router = Router();

router.use(isVerifyLogined);

router.get("/", isVerifyProfile, ParticipateInController.getChannels);

export default router;
