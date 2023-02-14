// User Profile pages

import { IProfile, IProfileResponse } from "src/model/user/profile"

//-------------------
export type ProfileHeaderType = {
  id: string
  nickName: string
  // coverImg: string
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
}
