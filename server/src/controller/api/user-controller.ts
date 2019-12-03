import { User } from "../../entity/User";
import { Request, Response } from "express";
import ResponseForm from "../../utils/response-form";
import { CREATED, CONFLICT } from "./common/status-code";
import {
  NOT_ELEGIBLE_USER_FORM,
  CANNOT_CREATE_USER,
  CREATE_USER_SUCCESSFULLY
} from "./common/messages";
import { generateHashedPassword } from "../../utils/password/generate-password";
import {
  validateEmail,
  validatePasswordLength
} from "../../validator/identifier-validator";

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
  try {
    if (!validateEmail(email) || !validatePasswordLength(password))
      throw Error(NOT_ELEGIBLE_USER_FORM);
    const hashedPassword = await generateHashedPassword(password);
    const user = await User.save({
      email,
      name,
      password: hashedPassword
    } as User);
    const responseForm = ResponseForm.of<User>(CREATE_USER_SUCCESSFULLY, user);
    return response.status(CREATED).json(responseForm);
  } catch (error) {
    return response.status(CONFLICT).json(ResponseForm.of(CANNOT_CREATE_USER));
  }
  return;
  //   try {
  //     const profile = await User.findOneOrFail(email);
  //     const post = await User.save({
  //       email,
  //       profile: profile,
  //       room: roomId
  //     } as Post);
  //     const responseForm = ResponseForm.of<User>(FOUND_POST_PROFILE, user);
  //     return response.status(CREATED).json(responseForm);
  //   } catch (error) {
  //     return response.status(NOT_FOUND).json(ResponseForm.of(NOT_FOUND_PROFILE));
  //   }
};
