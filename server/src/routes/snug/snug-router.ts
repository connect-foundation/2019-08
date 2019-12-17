import { Router } from "express";
import { create, findByUserId } from "../../controller/api/snug-controller";
import inviteRouter from "./invite/invite-router";
import { isNumeric } from "../../middleware/validator";

const router = Router({ mergeParams: true });

router.use("/:snugId/invite", inviteRouter);

router.route("/")
        .get(findByUserId)
        .post(create);

router.param("snugId", isNumeric);
export default router;
