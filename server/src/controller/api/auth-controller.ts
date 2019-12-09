import { User } from "../../domain/entity/User";
import { Request, Response } from "express";
import { OK, NOT_FOUND } from "http-status-codes";
import ResponseForm from "../../utils/response-form";
import jwt from "jsonwebtoken";
import * as crypto from "bcryptjs";
import { Email } from "../../domain/vo/Email";

type bodyType = {
  email: string;
  password: string;
};

export const login = async (request: Request, response: Response) => {
  try {
    const { email, password }: bodyType = request.body;
    const secret = process.env.SECRET_KEY;
    const emailModel = Email.build(email);
    const user = await User.findOne({ where: { email: emailModel } });
    const payload = {
      id: user.id,
      name: user.name,
      email: email
    };
    if (!crypto.compareSync(password, user.password)) {
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
