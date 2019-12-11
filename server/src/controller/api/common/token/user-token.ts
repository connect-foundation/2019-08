import {Email} from "../../../../domain/vo/Email";
import {User} from "../../../../domain/entity/User";
import {Token} from "./token";
import _ from "lodash";

export class UserToken extends Token<User> {
  private static readonly TOKEN_ITEMS = ["id", "name", "email"];

  parsePayloadBy(user: User): object {
    const intermediatePayload = _.pick(user, UserToken.TOKEN_ITEMS);
    return _.update(intermediatePayload, "email", (email: Email) => email.asFormat());
  }
}