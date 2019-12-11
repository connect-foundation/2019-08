import {User} from "../../domain/entity/User";
import {Email} from "../../domain/vo/Email";
import {Request, Response} from "express";
import {NOT_FOUND, OK} from "http-status-codes";
import ResponseForm from "../../utils/response-form";
import * as crypto from "bcryptjs";
import {offerTokenInfo} from "../../validator/identifier-validator";
import {Profile} from "../../domain/entity/Profile";
import {Token} from "./common/token/token";
import {UserToken} from "./common/token/user-token";
import {ProfileToken} from "./common/token/profile-token";
import {ProfileInfo} from "../../model/profile/profile-info";

type bodyType = {
  email: string;
  password: string;
};

export const login = async (request: Request, response: Response): Promise<Response> => {
  try {
    const { email, password }: bodyType = request.body;
    const emailModel = Email.from(email);
    const user = await User.findOne({ where: { email: emailModel } });
    if (!crypto.compareSync(password, user.password)) {
      throw new Error("패스워드가 틀렸습니다.");
    }

    const userToken: Token<User> = new UserToken();
    return response
      .status(OK)
      .json(ResponseForm.of("토큰입니다.", { token: userToken.tokenize(user) }));
  } catch (error) {
    return response.status(NOT_FOUND).json(ResponseForm.of(error.message));
  }
};

export const getProfileToken = async (request: Request, response: Response): Promise<Response> => {
  const { snugId } = request.params;
  try {
    const { id } = offerTokenInfo(request);
    const userId = id.toString();
    const profile = await Profile.findOneByUserIdAndSnugId(userId, snugId);
    const profileInfo = ProfileInfo.fromProfile(profile);
    const profileToken: Token<ProfileInfo> = new ProfileToken();
    return response.status(OK)
            .cookie("profile", profileToken.tokenize(profileInfo))
            .json(ResponseForm.of("토큰 입니다."));
  } catch (error) {
    return response.status(NOT_FOUND).json(ResponseForm.of(error.message));
  }
};
