// ** Next Import
import { GetStaticProps, GetStaticPaths, GetStaticPropsContext, InferGetStaticPropsType } from 'next/types'

// ** Demo Components Imports
import UserProfile from 'src/views/pages/user-profile/UserProfile'

// ** Types
import { ProfileTabType } from 'src/types/profile/types'
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

  const { profile, follow, followCount, follower, followerCount } = useProfile()
  const [data, setData] = useState<ProfileTabType | null>(null)

  useEffect(() => {
    if (typeof profile === 'undefined' && typeof otherData === 'undefined') return
    if (typeof otherData !== 'undefined' && typeof otherData?.data === 'object' && typeof otherData?.data !== 'string') {
      const profileData = otherData.data.profile
      setData({
        header: {
          id: profileData.id,
          nickName: profileData.nickName,
          avatarImg: profileData.avatarImg ?? '',
          world: profileData.world,
          job: profileData.jobDetail !== '' ? profileData.jobDetail : profileData.job,
          holdFlg: profile?.id === profileData.id,
          iamFollowHim: profileData.iamFollowHim,
          heFollowMe: profileData.heFollowMe,
        },
        overview: { profile: otherData.data.profile, followCount: otherData.data.acceptedFollowCount, followerCount: otherData.data.acceptedFollowerCount },
        follows: otherData.data.follow,
        followers: otherData.data.follower,
        isMyData: (profileData.id === profile?.id)
      }
      )
    } else if (typeof profile !== 'undefined' && typeof accountId === 'undefined') {
      setData({
        header: {
          id: profile.id,
          nickName: profile.nickName,
          avatarImg: profile.avatarImg ?? '',
          world: profile.world,
          job: profile.jobDetail !== '' ? profile.jobDetail : profile.job,
          holdFlg: true,
          iamFollowHim: null,
          heFollowMe: null,
        },
        overview: { profile: profile, followCount: followCount, followerCount: followerCount },
        follows: follow,
        followers: follower,
        isMyData: true,
      })
    } 
  }, [profile, otherData])

  return <UserProfile tab={tab} data={data} accountId={accountId as string} />
}

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [
      { params: { tab: 'profile' } },
      { params: { tab: 'follow' } },
      { params: { tab: 'follower' } },
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
