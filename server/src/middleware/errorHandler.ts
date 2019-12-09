import  {Router ,Request, Response, NextFunction } from "express";
import HttpException from "src/utils/HttpException.js";

const router = Router();

router.use((request: Request, response: Response, next: NextFunction) => {
  const notFoundError = new HttpException("not found url request", 404);
  next(notFoundError);
});

router.use((error: Error, request: Request, response: Response, next: NextFunction) => {
  const status = (error as HttpException).status || 500;
  const message = request.app.get("env") === "production" ? error.name : error.message || "Something went wrong";
  response.status(status)
    .send({
      message,
      payload: {},
    });
});

export default router;
