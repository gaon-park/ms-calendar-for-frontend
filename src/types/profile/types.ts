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
  holderFlg: boolean;
  friendStatus: string;
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
  holderFlg: boolean;
  friendStatus: string;
}

export type ProfileFriendsTabType = {
  name: string
  avatar: string
  isFriend: boolean
  connections: string
}

export type ProfileTabType = {
  header: ProfileHeaderType
  overview: ProfileOverviewType
}
export type UserProfileActiveTab = ProfileTabType | ProfileFriendsTabType[]
