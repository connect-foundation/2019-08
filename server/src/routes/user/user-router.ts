import { Router, Request } from "express";
import * as UserApiController from "../../controller/api/user-controller";

const router = Router();

router.post("/", UserApiController.create);
export default router;
