import { User } from "./../../entity/User";
import { Request, Response } from "express";
import { OK, NOT_FOUND } from "./common/status-code";
import ResponseForm from "../../utils/response-form";
import jwt from "jsonwebtoken";
import * as crypto from "bcryptjs";

type bodyType = {
  email: string;
  password: string;
};

export const login = async (request: Request, response: Response) => {
  try {
    const { email, password }: bodyType = request.body;
    console.log(email, password);


    const secret = process.env.SECRET_KEY;
    const user = await User.findOne({ where: { email: email } });
    const payload = {
      id: user.id,
      email: email
    };
    if (!crypto.compareSync(password, user.password)){
      console.log("비교 실패");
      throw new Error("패스워드가 틀렸습니다.");
    }
    const token = jwt.sign(payload, secret);
    console.log("비교성공");
    return response
      .status(OK)
      .json(ResponseForm.of("토큰입니다.", { token: token }));
  } catch (error) {
    return response.status(NOT_FOUND).json(ResponseForm.of(error.message));
  }
};
