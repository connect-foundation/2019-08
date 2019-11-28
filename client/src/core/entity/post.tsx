export interface Profile {
  id?: number;
  thumbnail?: string;
  name?: string;
}

export interface Post {
  id?: number;
  createdAt?: string;
  updatedAt?: string;
  contents?: string;
  profile?: Profile;
}
