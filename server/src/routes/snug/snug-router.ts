import { Router } from "express";
import { create, findByUserId } from "../../controller/api/snug-controller"

const router = Router();

router.get("/", findByUserId);

router.post("/", create);

export default router;
