import { Response, Request, NextFunction } from "express";
import ResponseForm from "../utils/response-form";
import {NO_USER_WITH_EMAIL, UNSUPPORTED_EMAIL} from "../controller/api/common/messages";
import _ from "lodash";

import {
  hasNotEveryNumber,
  hasNotValue,
  isOutOfRange
} from "../validator/identifier-validator";
import {
  validateEmail,
  validatePasswordLength
} from "../validator/email-validator";
import UrlInfo from "../utils/url-info";
import {BAD_REQUEST, NOT_FOUND} from "http-status-codes";

/**
 *
 * request path variable 인 id 대한 유효성 검사
 * 유효한 경우, next() 메소드가 err 인자 없이 호출되고
 * 유효하지 않은 경우, next(err) 메소드가 err 인자를 가지고 호출
 *
 * @param request express Request
 * @param response express Response
 * @param next express Next
 * @param id
 *
 * */
export const isNumeric = (
  request: Request,
  response: Response,
  next: NextFunction,
  id: string
) => {
  if (hasNotValue(id) || hasNotEveryNumber(id) || isOutOfRange(id)) {
    return next("Invalid id format. Must be an Number");
  }

  next();
};

export const isValidUserForm = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  if (
    validateEmail(request.body.email) &&
    validatePasswordLength(request.body.password)
  ) {
    return next();
  }

  return response.status(NOT_FOUND).json(ResponseForm.of(NO_USER_WITH_EMAIL));
};

export const isValidInviteForm = (
        request: Request,
        response: Response,
        next: NextFunction
) => {

  const {emails} = request.body;
  if (_.every(emails, validateEmail)) {
    return next();
  }

  return response.status(BAD_REQUEST).json(ResponseForm.of<object>(UNSUPPORTED_EMAIL, {link: UrlInfo.aboutHome()}));
};
