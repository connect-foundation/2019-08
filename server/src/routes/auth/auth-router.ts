import { Router } from "express";
import * as AuthApiController from "../../controller/api/auth-controller";

const router = Router();

router.post("/login", AuthApiController.login);

router.get("/snugs/:snugId/profiles", AuthApiController.getProfileToken);

export default router;
