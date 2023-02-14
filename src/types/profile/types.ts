// User Profile pages
//-------------------
export type ProfileHeaderType = {
  id: string
  nickName: string
  // coverImg: string
  avatarImg: string
  job: string
  world: string
  createdAt: string
}

export type ProfileOverviewType = {
  id: string
  nickName: string
  accountId: string
  createdAt: string
  updatedAt: string
  isPublic: boolean
  avatarImg: string
  world: string
  job: string
  jobDetail: string
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
