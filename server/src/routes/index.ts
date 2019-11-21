import {Router, Request, Response} from "express";
import {Post} from "../entity/Post";
import {getConnection} from "typeorm";

const router = Router();
router.get("/", async (req: Request, res: Response) => {
  let post = new Post();
  post.contents = 'kkr';
  post.imgSrc = 'kkr.img'
  await getConnection().manager.save(post);
  res.send('hello world');
});
export default router;