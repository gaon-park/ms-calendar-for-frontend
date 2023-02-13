// ** Next Import
import { GetStaticProps, GetStaticPaths, GetStaticPropsContext, InferGetStaticPropsType } from 'next/types'

// ** Demo Components Imports
import UserProfile from 'src/views/pages/user-profile/UserProfile'

// ** Types
import { ProfileHeaderType, ProfileOverviewType, UserProfileActiveTab } from 'src/common/types/types'
import { useProfile } from 'src/hooks/useProfile'
import { useEffect, useState } from 'react'

const initialOvervieType: ProfileOverviewType = {
  id: '',
  nickName: '',
  accountId: '',
  createdAt: '',
  updatedAt: '',
  isPublic: false,
  avatarImg: '',
  world: '',
  job: '',
  jobDetail: '',
  holderFlg: false,
  friendStatus: '',
}

const initialHeaderType: ProfileHeaderType = {
  id: '',
  nickName: '',
  avatarImg: '',
  job: '',
  world: '',
  createdAt: '',
  holderFlg: false,
  friendStatus: ''
}

const initialData: UserProfileActiveTab = {
  header: initialHeaderType,
  overview: initialOvervieType
}

const UserProfileTab = ({ tab }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { profile } = useProfile()
  const [data, setData] = useState<UserProfileActiveTab>(initialData)

  useEffect(() => {
    if (typeof profile === 'undefined') return
    setData({
      header: {
        id: profile.id,
        nickName: profile.nickName,
        avatarImg: profile.avatarImg ?? '',
        job: (profile.jobDetail !== '') ? profile.jobDetail : profile.job,
        world: profile.world,
        createdAt: profile.createdAt,
        holderFlg: profile.holderFlg,
        friendStatus: profile.status
      },
      overview: {
        id: profile.id,
        nickName: profile.nickName,
        accountId: profile.accountId,
        createdAt: profile.createdAt,
        updatedAt: profile.updatedAt,
        isPublic: profile.isPublic,
        avatarImg: profile.avatarImg ?? '',
        world: profile.world,
        job: profile.job,
        jobDetail: profile.jobDetail,
        holderFlg: profile.holderFlg,
        friendStatus: profile.status
      }
    })
  }, [profile])

  return <UserProfile tab={tab} data={data} />
}

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [
      { params: { tab: 'profile' } },
      { params: { tab: 'friends' } }
    ],
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params }: GetStaticPropsContext) => {
  return {
    props: {
      tab: params?.tab
    }
  }
}

export default UserProfileTab
