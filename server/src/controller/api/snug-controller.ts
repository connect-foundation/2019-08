import {getManager} from "typeorm";
import {User} from "../../domain/entity/User";
import {Snug} from "../../domain/entity/Snug";
import {Profile, UserRole} from "../../domain/entity/Profile";
import {Room} from "../../domain/entity/Room";
import {ParticipateIn} from "../../domain/entity/ParticipateIn";
import {Request, Response} from "express";
import ResponseForm from "../../utils/response-form";
import {CREATED, INTERNAL_SERVER_ERROR, OK} from "http-status-codes";
import {offerTokenInfo, UserInfo} from "../../validator/identifier-validator";
import {CREATED_SNUG, OK_SNUG} from "./common/messages";

/**
 * client에서 보내온 메시지를 기반으로 snug를 DB에 저장
 * Snug, Profile, Room, ParticipateIn에 데이터 생성
 * @param request
 * @param response
 *
 * */
export const create = async (
  request: Request,
  response: Response
) => {
  const { name, description, thumbnail } = request.body;
  const userInfo: UserInfo = offerTokenInfo(request);

  try {
    await getManager().transaction(async transactionalEntityManager => {
      /**
       * 1. snug row 생성
       * 2. 전달된 userID를 통해 profile row를 저장
       * 3. 생성된 snug를 통해 room row 저장
       * 4. 생성된 profile과 room을 통해 particiapte in 저장
       */
      // 미들웨어에 user 객체가 존재 or db 조회
      const user: User = await transactionalEntityManager.findOne(User, {
        id: userInfo.id
      });

      const snug: Snug = new Snug();
      snug.name = name;
      snug.description = description;
      snug.thumbnail = thumbnail;
      const resultSnug = await transactionalEntityManager.save(snug);

      const profile: Profile = new Profile();
      profile.name = user.name;
      profile.status = "";
      profile.role = UserRole.ADMIN;
      profile.user = user;
      profile.snug = resultSnug;
      const resultProfile = await transactionalEntityManager.save(profile);

      // room 생성
      const room: Room = new Room();

      room.title = "기본 채널";
      room.isPrivate = false;
      room.isChannel = true;
      room.snug = resultSnug;
      room.creator = profile;
      const resultRoom = await transactionalEntityManager.save(room);

      // participate
      const particiapteIn: ParticipateIn = new ParticipateIn(
        resultProfile,
        resultRoom
      );
      await transactionalEntityManager.save(particiapteIn);

      const responseForm = ResponseForm.of<Snug>(CREATED_SNUG, resultSnug);
      response.status(CREATED).json(responseForm);
    });
  } catch (error) {
    return response
      .status(INTERNAL_SERVER_ERROR)
      .json(ResponseForm.of(error.messagenp));
  }
};

export const findByUserId = async (
  request: Request,
  response: Response
): Promise<Response> => {
  try {
    const userInfo: UserInfo = offerTokenInfo(request);

    const user: User = await User.findOne({ where: { id: userInfo.id } });
    const profiles: Profile[] = await getManager().find(Profile, {
      where: { user: user.id },
      relations: ["snug"]
    });
    const snugs: Snug[] = profiles.map(profile => {
      return profile.snug;
    });

    return response.status(OK).json(ResponseForm.of<Snug[]>(OK_SNUG, snugs));
  } catch (error) {
    return response
      .status(INTERNAL_SERVER_ERROR)
      .json(ResponseForm.of(error.messagenp));
  }
};
