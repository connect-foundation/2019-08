import { Snug } from "core/entity/snug";

export interface SnugRepositoryType {
  /**
   * snug¸¦ »ý¼ºÇÑ´Ù.
   * @param userId snug creator
   */
  create(snug: Snug): Promise<Snug | boolean>;

  getInvitedSnugs(email: string): Promise<Snug[] | boolean>;

  responseToInvitation(snug: Snug): Promise<Snug | boolean>;
}
