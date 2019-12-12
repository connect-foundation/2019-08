import { NextFunction, Request, Response } from "express";
import { Profile } from "../../domain/entity/Profile";
import { Profiler } from "../../model/profile/profiler";
import ResponseForm from "../../utils/response-form";
import { ACCEPTED, OK, UNAUTHORIZED } from "http-status-codes";
import { offerTokenInfo, UserInfo } from "../../validator/identifier-validator";
import {
  INACCESSIBLE_PROFILE,
  SUCCESS_FIND_PROFILE,
  SUCCESS_UPDATE_PROFILE
} from "./common/messages";
import { Token } from "./common/token/token";
import { ProfileInfo } from "../../model/profile/profile-info";
import { ProfileToken } from "./common/token/profile-token";

export const isAccessibleProfile = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  const { profileId } = request.params;
  const userInfo: UserInfo = offerTokenInfo(request);
  const isAccessible = await Profile.hasProfileByUserId(profileId, userInfo.id);
  if (isAccessible) {
    return next();
  }

  response.status(UNAUTHORIZED).json(ResponseForm.of(INACCESSIBLE_PROFILE));
};

export const update = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const { profileId } = request.params;
  const { name, status, thumbnail, phone, description } = request.body;
  const profile = Profile.builder()
    .addName(name)
    .addPhone(phone)
    .addStatus(status)
    .addThumbnail(thumbnail)
    .addDescription(description)
    .build();

  const profiler = new Profiler();
  const profileRevision = await profiler.update(profileId, profile);
  const profileToken: Token<ProfileInfo> = new ProfileToken();
  return response
    .status(ACCEPTED)
    .cookie("profile", profileToken.tokenize(profileRevision))
    .json(ResponseForm.of(SUCCESS_UPDATE_PROFILE, profileRevision));
};

export const findById = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const { profileId } = request.params;
  const profiler = new Profiler();
  const profileModel = await profiler.findById(profileId);
  return response
    .status(OK)
    .json(ResponseForm.of(SUCCESS_FIND_PROFILE, profileModel));
};
