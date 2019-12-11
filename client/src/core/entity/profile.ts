export enum Role {
  "admin" = "admin",
  "participant" = "participant"
}

export interface Profile {
  id?: number;
  thumbnail?: string;
  name?: string;
  status?: string;
  role?: Role;
  description?: string;
  phoneNumber?: string;
  email?: string;
}
