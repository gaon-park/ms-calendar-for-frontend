// User Profile pages

import { IProfile } from "src/model/user/profile"

//-------------------
export type ProfileHeaderType = {
  id: string
  nickName: string
  avatarImg: string
  world: string
  job: string
  holdFlg: boolean
  ifollowHim: 'FOLLOW' | 'WAITING' | null
  heFollowMe: 'FOLLOW' | 'WAITING' | null
}

export type ProfileOverviewType = {
  profile: IProfile
  followCount: number
  followerCount: number
}

export type ProfileTabType = {
  header: ProfileHeaderType
  overview: ProfileOverviewType
  follows: IProfile[]
  followers: IProfile[]
  isMyData: boolean
}
