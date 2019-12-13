import {User} from "../../domain/entity/User";
import {Request, Response} from "express";
import ResponseForm from "../../utils/response-form";
import {CREATED, NOT_FOUND, OK} from "http-status-codes";
import {CREATE_USER_SUCCESSFULLY, FOUND_EMAIL_USER, NO_USER_WITH_EMAIL} from "./common/messages";
import {generateHashedPassword} from "../../utils/password/generate-password";
import {Email} from "../../domain/vo/Email";
import {Invitee} from "../../model/invite/invitee";

export const create = async (request: Request, response: Response) => {
  const {email, name, password} = request.body;
  const hashedPassword = await generateHashedPassword(password);
  const emailModel = Email.from(email);
  const user = await User.save({
    email: emailModel,
    name,
    password: hashedPassword
  } as User);

  const invitee = new Invitee();
  await invitee.subscribeInvitations(user);
  const responseForm = ResponseForm.of<User>(CREATE_USER_SUCCESSFULLY, user);
  return response.status(CREATED).json(responseForm);
};
export const findByEmail = async (request: Request, response: Response) => {
  const email = request.params.email;
  const emailModel = Email.from(email);
  try {
    const user = await User.findOneOrFail({email: emailModel});
    return response
            .status(OK)
            .json(ResponseForm.of<User>(FOUND_EMAIL_USER, user));
  } catch (error) {
    return response.status(NOT_FOUND).json(ResponseForm.of(NO_USER_WITH_EMAIL));
  }
};
