export enum Role {
  "admin" = "admin",
  "member" = "member"
}

export interface Profile {
  id?: number;
  thumbnail?: string;
  name?: string;
  status?: string;
  role?: Role;
  description?: string;
  phone?: string;
  email?: string;
  snugId?: number;
}
