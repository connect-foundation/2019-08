import { StringHelper } from "core/common/string-helper";

export interface Channel {
  id?: number;
  name?: StringHelper;
  description?: StringHelper;
  visibility?: boolean;
}
