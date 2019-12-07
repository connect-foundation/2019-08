import { User } from "../../domain/entity/User";
import { Request, Response } from "express";
import ResponseForm from "../../utils/response-form";
import { CREATED, OK, NOT_FOUND } from "http-status-codes";
import {
  CREATE_USER_SUCCESSFULLY,
  FOUND_EMAIL_USER,
  NO_USER_WITH_EMAIL
} from "./common/messages";
import { generateHashedPassword } from "../../utils/password/generate-password";
import {Email} from "../../domain/vo/Email";

/**
 *
 * client에서 보내온 메시지를 기반으로 post를 DB에 저장
 *
 * @param request
 * @param response
 *
 * */
export const create = async (request: Request, response: Response) => {
  const { email, name, password } = request.body;
  const hashedPassword = await generateHashedPassword(password);
  const emailModel = Email.build(email);
  const user = await User.save({
    email: emailModel,
    name,
    password: hashedPassword
  } as User);
  const responseForm = ResponseForm.of<User>(CREATE_USER_SUCCESSFULLY, user);
  return response.status(CREATED).json(responseForm);
};

export const findByEmail = async (request: Request, response: Response) => {
  const email = request.params.email;
  const emailModel = Email.build(email);

  try {
    const user = await User.findOneOrFail({ email: emailModel });
    return response
      .status(OK)
      .json(ResponseForm.of<User>(FOUND_EMAIL_USER, user));
  } catch (error) {
    return response.status(NOT_FOUND).json(ResponseForm.of(NO_USER_WITH_EMAIL));
  }
};
