export interface IUserResponse {
  id: string;
  email: string;
  nickName: string;
  accountId: string;
  avatarImg: string;
  isPublic: boolean;
  world: string;
  job: string;
  jobDetail: string;
  status: string;
}

export interface ILoginResponse {
  accessToken: string;
}