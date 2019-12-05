import { Router } from "express";
import inviteRouter from "./invite/invite-router";
import {isNumeric} from "../../validator/identifier-validator";
import { create } from "../../controller/api/snug-controller";

const router = Router({mergeParams: true});

router.use("/:snugId/invite", inviteRouter);

router.post("/", create);

router.param("snugId", isNumeric);
export default router;