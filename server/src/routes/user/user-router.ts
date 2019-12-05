import { Router } from "express";
import * as UserApiController from "../../controller/api/user-controller";
import { isValidUserForm } from "../../middleware/validator";

const router = Router();

router.post("/", isValidUserForm, UserApiController.create);
router.get("/email/:email", UserApiController.findByEmail);
export default router;
