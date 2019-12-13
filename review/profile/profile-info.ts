import { Profile, UserRole } from "../../domain/entity/Profile";
import _ from "lodash";

export class ProfileInfo {
  private id: number;
  private name: string;
  private phone: string;
  private status: string;
  private thumbnail: string;
  private description: string;
  private role: UserRole;
  private updatedAt: Date;
  private email: string;
  private snugId: number;

  private constructor(
    id: number,
    name: string,
    phone: string,
    status: string,
    thumbnail: string,
    description: string,
    role: UserRole,
    updatedAt: Date,
    email?: string,
    snugId?: number
  ) {
    this.id = id;
    this.name = name;
    this.phone = phone;
    this.status = status;
    this.thumbnail = thumbnail;
    this.description = description;
    this.role = role;
    this.updatedAt = updatedAt;
    this.email = email;
    this.snugId = snugId;
  }

  static fromProfile(profile: Profile): ProfileInfo {
    const {
      id,
      name,
      status,
      phone,
      thumbnail,
      description,
      role,
      updatedAt,
      user,
      snug
    } = profile;
    const email = user && user.email.asFormat();
    const snugId = snug && snug.id;
    return new ProfileInfo(
      id,
      name,
      phone,
      status,
      thumbnail,
      description,
      role,
      updatedAt,
      email,
      snugId
    );
  }

  public asObject(): object {
    return _.toPlainObject(this);
  }
}
