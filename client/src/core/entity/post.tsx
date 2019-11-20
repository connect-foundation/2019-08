export interface Profile {
  profileThumnail: string;
  profileName: string;
}

export interface Post {
  id: number;
  createdAt: string;
  updatedAt: string;
  contents: string;
  profile: Profile;
}
