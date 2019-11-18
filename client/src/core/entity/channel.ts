import {StringHelper} from "core/common/string-helper";

export interface Channel {
  name: StringHelper;
  description: StringHelper;
  visibility: boolean;
}