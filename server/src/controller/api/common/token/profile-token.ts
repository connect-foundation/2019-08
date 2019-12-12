import {Token} from "./token";
import {ProfileInfo} from "../../../../model/profile/profile-info";

export class ProfileToken extends Token<ProfileInfo> {
  parsePayloadBy(profileInfo: ProfileInfo): object {
    return profileInfo.asObject();
  }
}
