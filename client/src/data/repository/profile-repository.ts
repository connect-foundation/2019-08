import { ResponseEntity } from "data/http/api/response/ResponseEntity";
import { ProfileRepositoryType } from "core/use-case/profile-repository-type";
import { ProfileApi } from "data/http/api/profile-api";
import { Profile } from "core/entity/profile";

export class ProfileRepository implements ProfileRepositoryType {
  private api: ProfileApi;

  constructor(api: ProfileApi) {
    this.api = api;
  }

  async getList(): Promise<Profile[] | boolean> {
    try {
      const responseEntity = await this.api.getList();
      if ((<ResponseEntity<Profile[]>>responseEntity).payload) {
        return (<ResponseEntity<Profile[]>>responseEntity).payload.posts;
      }
      return <boolean>responseEntity;
    } catch (error) {
      return false;
    }
  }
}
