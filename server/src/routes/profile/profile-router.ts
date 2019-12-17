import {Router} from "express";
import * as ProfileApiController from "../../controller/api/profile-controller";
import {isNumericProfileId} from "../../middleware/validator";

const router = Router({mergeParams: true});

router.use("/:profileId", ProfileApiController.isAccessibleProfile);

router.route("/:profileId")
        .get(ProfileApiController.findById)
        .patch(ProfileApiController.update);

router.param("profileId", isNumericProfileId);

export default router;