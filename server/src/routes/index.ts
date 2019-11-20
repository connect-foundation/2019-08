import {Router, Request, Response} from "express";
import {Channel} from "src/entity/Channel";

const router = Router();
router.get("/", async (req: Request, res: Response) => {
  res.json(await Channel.find());
});
export default router;