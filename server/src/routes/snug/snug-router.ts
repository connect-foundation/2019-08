import { Router } from "express";
import { create, findByUserId } from "../../controller/api/snug-controller"
import inviteRouter from "./invite/invite-router";
import {isNumeric} from "../../validator/identifier-validator";

const router = Router({mergeParams: true});

router.use("/:snugId/invite", inviteRouter);

router.get("/", findByUserId);

router.post("/", create);

router.param("snugId", isNumeric);
export default router;