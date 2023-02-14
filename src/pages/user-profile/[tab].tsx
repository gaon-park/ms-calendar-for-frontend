// ** Next Import
import { GetStaticProps, GetStaticPaths, GetStaticPropsContext, InferGetStaticPropsType } from 'next/types'

// ** Demo Components Imports
import UserProfile from 'src/views/pages/user-profile/UserProfile'

// ** Types
import { UserProfileActiveTab } from 'src/types/profile/types'
import { useProfile } from 'src/hooks/useProfile'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import useSWR from "swr"
import { SearchUserProfile } from 'src/common/api/msBackend/search'

const UserProfileTab = ({ tab }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter()
  const { accountId } = router.query

  const { data: otherData } = useSWR(
    (
      typeof accountId === 'string' && accountId.replaceAll(' ', '') !== ''
    ) ? { accountId } : null,
    () => SearchUserProfile({
      accountId: accountId as string
    }),
    {
      revalidateIfStale: false,
      revalidateOnFocus: true,
      revalidateOnReconnect: true
    }
  )

  const { profile } = useProfile()
  const [data, setData] = useState<UserProfileActiveTab | null>(null)

  useEffect(() => {
    if (typeof profile === 'undefined' && typeof otherData === 'undefined') return
    if (typeof otherData !== 'undefined' && typeof otherData?.data === 'object' && typeof otherData?.data !== 'string') {
      const profileData = otherData.data.profile
      setData({
        header: {
          id: profileData.id,
          nickName: profileData.nickName,
          avatarImg: profileData.avatarImg ?? '',
          job: (profileData.jobDetail !== '') ? profileData.jobDetail : profileData.job,
          world: profileData.world,
          createdAt: profileData.createdAt,
          holdFlg: profile?.profile?.id === profileData.id,
          ifollowHim: profileData.ifollowHim,
          heFollowMe: profileData.heFollowMe,
        },
        overview: {
          id: profileData.id,
          nickName: profileData.nickName,
          accountId: profileData.accountId,
          createdAt: profileData.createdAt,
          updatedAt: profileData.updatedAt,
          isPublic: profileData.isPublic,
          avatarImg: profileData.avatarImg ?? '',
          world: profileData.world,
          job: profileData.job,
          jobDetail: profileData.jobDetail,
          followCount: otherData.data.acceptedFollowCount,
          followerCount: otherData.data.acceptedFollowerCount
        }
      })
    } else if (typeof profile !== 'undefined') {
      const profiledata = profile.profile
      setData({
        header: {
          id: profiledata.id,
          nickName: profiledata.nickName,
          avatarImg: profiledata.avatarImg ?? '',
          job: (profiledata.jobDetail !== '') ? profiledata.jobDetail : profiledata.job,
          world: profiledata.world,
          createdAt: profiledata.createdAt,
          holdFlg: true,
          ifollowHim: null,
          heFollowMe: null,
        },
        overview: {
          id: profiledata.id,
          nickName: profiledata.nickName,
          accountId: profiledata.accountId,
          createdAt: profiledata.createdAt,
          updatedAt: profiledata.updatedAt,
          isPublic: profiledata.isPublic,
          avatarImg: profiledata.avatarImg ?? '',
          world: profiledata.world,
          job: profiledata.job,
          jobDetail: profiledata.jobDetail,
          followCount: profile.acceptedFollowCount,
          followerCount: profile.acceptedFollowerCount
        }
      })
    }
  }, [profile, otherData])

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
