import { getManager } from "typeorm";
import { User } from "../../entity/User";
import { Snug } from "../../entity/Snug";
import { Profile } from "../../entity/Profile";
import { Room } from "../../entity/Room";
import { ParticipateIn } from "../../entity/ParticipateIn";
import { NextFunction, Request, Response } from "express";
import ResponseForm from "../../utils/response-form";
import { CREATED, INTERNAL_SERVER_ERROR } from "http-status-codes";
import jwt from "jsonwebtoken";
import { offerTokenInfo, UserInfo } from "../../validator/identifier-validator";

/**
 * client에서 보내온 메시지를 기반으로 snug를 DB에 저장
 * Snug, Profile, Room, ParticipateIn에 데이터 생성
 * @param request
 * @param response
 *
 * */
export const create = async (request: Request, response: Response, next: NextFunction) => {
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
            const snug: Snug = new Snug();
            snug.name = name;
            snug.description = description;
            snug.thumbnail = thumbnail;
            const resultSnug = await transactionalEntityManager.save(snug);

            // 미들웨어에 user 객체가 존재 or db 조회
            const user: User = await transactionalEntityManager.findOne(User, userInfo.id);

            const profile: Profile = new Profile();
            profile.name = user.email;
            profile.status = "";
            profile.role = "admin";
            profile.user = user;
            const resultProfile = await transactionalEntityManager.save(profile);
            
            // room 생성
            const room: Room = new Room();

            room.title = "기본 채널";
            room.description = "기본 채널"
            room.isPrivate = false;
            room.isChannel = true;
            room.snug = resultSnug;
            room.creator = profile;
            const resultRoom = await transactionalEntityManager.save(room);
            
            // participate
            const particiapteIn: ParticipateIn = new ParticipateIn();
            particiapteIn.participant = resultProfile;
            particiapteIn.room = resultRoom;
            const particiapteInResult = await transactionalEntityManager.save(particiapteIn);
            
            const responseForm = ResponseForm.of<Snug>("", resultSnug);
            response.status(CREATED).json(responseForm);
        });
    } catch (error) {
        return response.status(INTERNAL_SERVER_ERROR).json(ResponseForm.of(error.messagenp));
    }
};

export const findByUserId = async (request: Request, response: Response, next: NextFunction) => {
    const { userId } = request.body;
}