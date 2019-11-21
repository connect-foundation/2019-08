import { StringHelper } from "core/common/string-helper";

export interface Channel {
  name: StringHelper;
  description: StringHelper;
  visibility: boolean;
  createdAt?: Date;
}

export interface User {
  user: StringHelper;
}

export interface ChannelBrowseModal {
  user: User;
  channel: Channel;
}
