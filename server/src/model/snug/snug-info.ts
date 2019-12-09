import UrlInfo from "../../utils/url-info";
import {Snug} from "../../domain/entity/Snug";

export class SnugInfo {
  private id: number;
  private name: string;
  private thumbnail: string;
  private description: string;
  private link: string;
  private createdAt: Date;

  private constructor(id: number, name: string, thumbnail: string, description: string, link: string, createdAt: Date) {
    this.id = id;
    this.name = name;
    this.thumbnail = thumbnail;
    this.description = description;
    this.link = link;
    this.createdAt = createdAt;
  }

  static fromSnug(snug: Snug): SnugInfo {
    const {id, name, createdAt, thumbnail, description} = snug;
    const link = UrlInfo.aboutSnugById(snug.id);
    return new SnugInfo(id, name, thumbnail, description, link, createdAt);
  }
}