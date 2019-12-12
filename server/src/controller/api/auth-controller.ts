import { User } from "../../domain/entity/User";
import { Email } from "../../domain/vo/Email";
import { Request, Response } from "express";
import {NOT_FOUND, OK, UNAUTHORIZED} from "http-status-codes";
import ResponseForm from "../../utils/response-form";
import * as crypto from "bcryptjs";
import { offerTokenInfo } from "../../validator/identifier-validator";
import { Profile } from "../../domain/entity/Profile";
import { Token } from "./common/token/token";
import { UserToken } from "./common/token/user-token";
import { ProfileToken } from "./common/token/profile-token";
import { ProfileInfo } from "../../model/profile/profile-info";
import {
  INVALID_USER_EMAIL,
  INVALID_USER_PASSWORD, NOT_EXIST_USER_OR_SNUG,
  SUCCESS_GENERATE_PROFILE_TOKEN,
  SUCCESS_GENERATE_USER_TOKEN
} from "./common/messages";

type bodyType = {
  email: string;
  password: string;
};

export const login = async (
  request: Request,
  response: Response
): Promise<Response> => {
  try {
    const { email, password }: bodyType = request.body;
    const emailModel = Email.from(email);
    const user = await User.findOne({ where: { email: emailModel } });
    if (!crypto.compareSync(password, user.password)) {
      return response.status(UNAUTHORIZED).json(ResponseForm.of(INVALID_USER_PASSWORD));
    }

    const userToken: Token<User> = new UserToken();
    return response
      .status(OK)
      .json(
        ResponseForm.of(SUCCESS_GENERATE_USER_TOKEN, { token: userToken.tokenize(user) })
      );
  } catch (error) {
    return response.status(NOT_FOUND).json(ResponseForm.of(INVALID_USER_EMAIL));
  }
};

export const getProfileToken = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const { snugId } = request.params;
  try {
    const { id } = offerTokenInfo(request);
    const userId = id.toString();
    const profile = await Profile.findOneByUserIdAndSnugId(userId, snugId);
    const profileInfo = ProfileInfo.fromProfile(profile);
    const profileToken: Token<ProfileInfo> = new ProfileToken();
    return response
      .status(OK)
      .cookie("profile", profileToken.tokenize(profileInfo))
      .json(ResponseForm.of(SUCCESS_GENERATE_PROFILE_TOKEN));
  } catch (error) {
    return response.status(NOT_FOUND).json(ResponseForm.of(NOT_EXIST_USER_OR_SNUG));
  }
};
