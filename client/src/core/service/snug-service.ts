import { Snug } from "core/entity/snug";
import { SnugRepositoryType } from "core/use-case/snug-repository-type";

export class SnugService {
  private repository: SnugRepositoryType;

  constructor(repository: SnugRepositoryType) {
    this.repository = repository;
  }

  async createSnug(
    name: string,
    description: string,
    thumbnail: string
  ): Promise<Snug | boolean> {
    const snug: Snug = { name, description, thumbnail };
    return await this.repository.create(snug);
  }

  async getList(): Promise<Snug[] | boolean> {
    return await this.repository.getList();
  }
}
