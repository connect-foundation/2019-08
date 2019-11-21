import { StringHelper } from "core/common/string-helper";
import { Channel } from "core/entity/channel";

export class ChannelModel implements Channel {
  private static readonly NAME_MIN_LENGTH = 0;
  private static readonly NAME_MAX_LENGTH = 11;
  private static readonly DESCRIPTION_MIN_LENGTH = 0;
  private static readonly DESCRIPTION_MAX_LENGTH = 31;
  name: StringHelper;
  description: StringHelper;
  visibility: boolean;

  constructor(name: string, description: string, visibility: boolean) {
    this.name = new StringHelper(name);
    this.description = new StringHelper(description);
    this.visibility = visibility;
  }

  public getName(): string {
    return this.name.getValue();
  }

  public isImpossibleFormat(): boolean {
    return !(
      this.hasRightNameFormat(this.name) &&
      this.hasRightDescriptionFormat(this.description)
    );
  }

  private hasRightNameFormat(name: StringHelper) {
    return (
      name.moreThan(ChannelModel.NAME_MIN_LENGTH) &&
      name.lessThan(ChannelModel.NAME_MAX_LENGTH)
    );
  }

  private hasRightDescriptionFormat(description: StringHelper) {
    return (
      description.moreThan(ChannelModel.DESCRIPTION_MIN_LENGTH) &&
      description.lessThan(ChannelModel.DESCRIPTION_MAX_LENGTH)
    );
  }
}
