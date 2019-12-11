import { ParticipateIn } from "./../../domain/entity/ParticipateIn";
import { Profile } from "./../../domain/entity/Profile";
import { Request, Response } from "express";
import { OK, NOT_FOUND } from "http-status-codes";
import ResponseForm from "../../utils/response-form";
import { offerProfileTokenInfo } from "../../validator/identifier-validator";

export const getChannels = async (request: Request, response: Response) => {
  try {
    const profile: Profile = <Profile>offerProfileTokenInfo(request);
    const rooms = await ParticipateIn.find({
      where: { Participant: profile.id }
    });
    response.status(OK).json(ResponseForm.of("", rooms));
  } catch (error) {
    response.status(NOT_FOUND).json(ResponseForm.of(error.message));
  }
};
