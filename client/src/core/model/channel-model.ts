import { StringHelper } from "core/utility/string-helper";
import { Channel } from "core/entity/channel";

export class ChannelModel implements Channel {
  private static readonly NAME_MIN_LENGTH = 0;
  private static readonly NAME_MAX_LENGTH = 11;
  private static readonly DESCRIPTION_MIN_LENGTH = 0;
  private static readonly DESCRIPTION_MAX_LENGTH = 31;
  readonly title: string;
  readonly description: string;
  readonly privacy: boolean;

  constructor(name: string, description: string, visibility: boolean) {
    this.title = name;
    this.description = description;
    this.privacy = visibility;
  }

  getName(): string {
    return this.title;
  }

  public isImpossibleFormat(): boolean {
    return !(
      this.hasRightNameFormat(this.title) &&
      this.hasRightDescriptionFormat(this.description)
    );
  }

  private hasRightNameFormat(name: string): boolean {
    return StringHelper.isInner(
      name,
      ChannelModel.NAME_MIN_LENGTH,
      ChannelModel.NAME_MAX_LENGTH
    );
  }

  private hasRightDescriptionFormat(description: string): boolean {
    return StringHelper.isInner(
      description,
      ChannelModel.DESCRIPTION_MIN_LENGTH,
      ChannelModel.DESCRIPTION_MAX_LENGTH
    );
  }
}
