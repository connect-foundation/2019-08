export interface Channel {
  [propName: string]: any;
  id?: number;
  title?: string;
  description?: string;
  privacy?: boolean;
  createdAt?: Date;
  creatorName?: string;
}
