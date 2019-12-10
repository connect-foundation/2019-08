import {Profile} from "../../domain/entity/Profile";
import {ProfileInfo} from "./profile-info";

export class Profiler {
  public async update(id: string, profile: Profile): Promise<ProfileInfo> {
    const profileModel = await Profile.findById(id);
    const profileRevision = await Profile.merge(profileModel, profile);
    return ProfileInfo.fromProfile(profileRevision);
  }

  public async findById(profileId: string): Promise<ProfileInfo> {
    const profile = await Profile.findById(profileId);
    return ProfileInfo.fromProfile(profile);
  }
}