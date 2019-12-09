import { Router } from "express";
import { create, findByUserId } from "../../controller/api/snug-controller";
import inviteRouter from "./invite/invite-router";
import { isNumeric } from "../../validator/identifier-validator";
import profileRouter from "./profile";
const router = Router({ mergeParams: true });

router.use("/:snugId/invite", inviteRouter);

router.use("/:snugId/profile", profileRouter);

router.get("/", findByUserId);

router.post("/", create);

router.param("snugId", isNumeric);
export default router;
