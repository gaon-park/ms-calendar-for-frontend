export interface IUserResponse {
  id: string;
  nickName: string;
  accountId: string;
  avatarImg: string;
  isPublic: boolean;
  world: string;
  job: string;
  jobDetail: string;
  status: string;
  holderFlg: boolean;
}

export interface ILoginResponse {
  accessToken: string;
}

export interface SimpleUserResponse {
  id: string
  accountId: string
  nickName: string
  avatarImg: string | null
}