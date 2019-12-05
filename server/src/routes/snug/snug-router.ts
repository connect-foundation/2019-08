import { Router } from "express";
import inviteRouter from "./invite/invite-router";
import {isNumeric} from "../../validator/identifier-validator";

const router = Router({mergeParams: true});

router.use("/:snugId/invite", inviteRouter);

router.param("snugId", isNumeric);
export default router;