import { Router } from "express";
import { create } from "../../controller/api/snug-controller"

const router = Router();

router.post("/", create);

export default router;
