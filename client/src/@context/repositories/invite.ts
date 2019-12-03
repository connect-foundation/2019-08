import {InviteRepositoryType} from "core/use-case/invite-repository-type";
import {InviteApi} from "data/http/api/invite-api";
import {InviteRepository} from "data/repository/invite-repository";

export class InviteRepositoryDependency {
  private readonly inviteRepository: InviteRepositoryType;

  constructor(api: InviteApi) {
    this.inviteRepository = new InviteRepository(api);
  }

  getInviteRepository(): InviteRepositoryType {
    return this.inviteRepository;
  }
}
