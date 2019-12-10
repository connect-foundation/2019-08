import {Router} from "express";
import * as ProfileApiController from "../../controller/api/profile-controller";

const router = Router({mergeParams: true});
router.use("/:profileId", ProfileApiController.isAccessibleProfile);
router.route("/:profileId")
        .get(ProfileApiController.findById)
        .patch(ProfileApiController.update);
export default router;