import { User } from "core/entity/user";

export interface UserRepositoryType {
  create(user: User): Promise<boolean>;
}
