import { Snug } from "core/entity/snug";

export interface SnugRepositoryType {
    /**
     * snug를 생성한다.
     * @param userId snug creator
     */
    create(snug: Snug): Promise<Snug | boolean>;

    getList(): Promise<Snug[] | boolean>
  getInvitedSnugs(email: string): Promise<Snug[] | boolean>;
  responseToInvitation(snug: Snug): Promise<Snug | boolean>;
}
