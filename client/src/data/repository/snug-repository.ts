import { ResponseEntity } from "./../http/api/response/ResponseEntity";
import { SnugApi } from "data/http/api/snug-api";
import { Snug } from "../../core/entity/snug";
import { SnugRepositoryType } from "../../core/use-case/snug-repository-type";

export class SnugRepository implements SnugRepositoryType {
  private api: SnugApi;

  constructor(api: SnugApi) {
    this.api = api;
  }

  async create(snug: Snug): Promise<Snug | boolean> {
    try {
      const responseEntity = await this.api.create(snug);
      if (typeof responseEntity === "boolean") return false;
      return (<ResponseEntity<Snug>>responseEntity).payload;
    } catch (error) {
      return false;
    }
  }
  async getInvitedSnugs(email: string): Promise<Snug[] | boolean> {
    try {
      const responseEntity = await this.api.getInvitedSnugs(email);
      if (!responseEntity) return false;
      return (<ResponseEntity<Snug[]>>responseEntity).payload;
    } catch (error) {
      return false;
    }
  }

  async responseToInvitation(snug: Snug): Promise<Snug | boolean> {
    try {
      const responseEntity = await this.api.responseToInvitation(snug);
      if (!responseEntity) return false;
      return (<ResponseEntity<Snug>>responseEntity).payload;
    } catch (error) {
      return false;
    }

    async getList(): Promise<Snug[] | boolean> {
        try {
            const responseEntity = await this.api.getList();
            return (<ResponseEntity<Snug[]>>responseEntity).payload;
        } catch (error) {
            return false;
        }
    }
  }
}
