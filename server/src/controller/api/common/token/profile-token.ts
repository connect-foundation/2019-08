import { Token } from "./token";
import _ from "lodash";
import { ProfileInfo } from "../../../../model/profile/profile-info";

export class ProfileToken extends Token<ProfileInfo> {
  private static readonly TOKEN_ITEMS = [
    "id",
    "name",
    "role",
    "thumbnail",
    "updatedAt",
    "snugId"
  ];

  parsePayloadBy(profileInfo: ProfileInfo): object {
    return _.pick(profileInfo, ProfileToken.TOKEN_ITEMS);
  }
}
