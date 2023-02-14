// User Profile pages
//-------------------
export type ProfileHeaderType = {
  id: string
  nickName: string
  // coverImg: string
  avatarImg: string
  job: string
  world: string
  createdAt: number[]
  holdFlg: boolean
  ifollowHim: 'FOLLOW' | 'WAITING' | null
  heFollowMe: 'FOLLOW' | 'WAITING' | null
}

export type ProfileOverviewType = {
  id: string
  nickName: string
  accountId: string
  createdAt: number[]
  updatedAt: number[]
  isPublic: boolean
  avatarImg: string
  world: string
  job: string
  jobDetail: string
  followCount: number
  followerCount: number
}

export type ProfileFollowTabType = {
  name: string
  avatar: string
}

export type ProfileTabType = {
  header: ProfileHeaderType
  overview: ProfileOverviewType
}
export type UserProfileActiveTab = ProfileTabType | ProfileFollowTabType[]
