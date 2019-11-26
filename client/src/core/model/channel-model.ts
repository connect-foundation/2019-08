import {StringHelper} from "core/utility/string-helper";
import {Channel} from "core/entity/channel";

export class ChannelModel implements Channel {
  private static readonly NAME_MIN_LENGTH = 0;
  private static readonly NAME_MAX_LENGTH = 11;
  private static readonly DESCRIPTION_MIN_LENGTH = 0;
  private static readonly DESCRIPTION_MAX_LENGTH = 31;
  readonly name: string;
  readonly description: string;
  readonly visibility: boolean;

  constructor(name: string, description: string, visibility: boolean) {
    this.name = name;
    this.description = description;
    this.visibility = visibility;
  }

  getName(): string {
    return this.name;
  }

  public isImpossibleFormat(): boolean {
    return !(
      this.hasRightNameFormat(this.name) &&
      this.hasRightDescriptionFormat(this.description)
    );
  }

  private hasRightNameFormat(name: string): boolean {
    return StringHelper.isInner(name, ChannelModel.NAME_MIN_LENGTH, ChannelModel.NAME_MAX_LENGTH);
  }

  private hasRightDescriptionFormat(description: string): boolean {
    return StringHelper.isInner(description, ChannelModel.DESCRIPTION_MIN_LENGTH, ChannelModel.DESCRIPTION_MAX_LENGTH);
  }
}
