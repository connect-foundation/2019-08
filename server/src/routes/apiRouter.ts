import { Router } from "express";
import postRouter from "./post/post-router";
import channelRouter from "./channel/channel-router";
import snugRouter from "./snug/snug-router";
import userRouter from "./user/user-router";
import authRouter from "./auth/auth-router";
import inviteRouter from "./invite/invite-router";

const router = Router();

router.use("/posts", postRouter);
router.use("/channels", channelRouter);
router.use("/snugs", snugRouter);
router.use("/auth", authRouter);
router.use("/users", userRouter);
router.use("/invite", inviteRouter);

export default router;
