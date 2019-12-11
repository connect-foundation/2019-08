import {Profile} from "../../domain/entity/Profile";

export class ProfileInfo {
  private id: number;
  private name: string;
  private phone: string;
  private status: string;
  private thumbnail: string;
  private description: string;
  private updatedAt: Date;
  private email: string;

  private constructor(id: number, name: string, phone: string, status: string, thumbnail: string, description: string, updatedAt: Date, email?: string) {
    this.id = id;
    this.name = name;
    this.phone = phone;
    this.status = status;
    this.thumbnail = thumbnail;
    this.description = description;
    this.updatedAt = updatedAt;
    this.email = email;
  }

  static fromProfile(profile: Profile): ProfileInfo {
    const {id, name, status, phone, thumbnail, description, updatedAt, user} = profile;
    const email = user && user.email.asFormat();
    return new ProfileInfo(id, name, phone, status, thumbnail, description, updatedAt, email);
  }
}