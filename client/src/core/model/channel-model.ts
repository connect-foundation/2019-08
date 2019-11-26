import {StringHelper} from "core/utility/string-helper";
import {Channel} from "core/entity/channel";

export class ChannelModel implements Channel {
  private static readonly TITLE_MIN_LENGTH = 0;
  private static readonly TITLE_MAX_LENGTH = 11;
  private static readonly DESCRIPTION_MIN_LENGTH = 0;
  private static readonly DESCRIPTION_MAX_LENGTH = 31;
  readonly title: string;
  readonly description: string;
  readonly privacy: boolean;

  constructor(title: string, description: string, privacy: boolean) {
    this.title = title;
    this.description = description;
    this.privacy = privacy;
  }

  getTitle(): string {
    return this.title;
  }

  public isImpossibleFormat(): boolean {
    return !(
            this.hasRightTitleFormat(this.title) &&
            this.hasRightDescriptionFormat(this.description)
    );
  }

  private hasRightTitleFormat(title: string): boolean {
    return StringHelper.isInner(
            title,
            ChannelModel.TITLE_MIN_LENGTH,
            ChannelModel.TITLE_MAX_LENGTH
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
