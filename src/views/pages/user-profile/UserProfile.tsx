// ** React Imports
import { useState, useEffect, ReactElement, SyntheticEvent } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** MUI Components
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import Typography from '@mui/material/Typography'
import { styled, Theme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import MuiTabList, { TabListProps } from '@mui/lab/TabList'
import CircularProgress from '@mui/material/CircularProgress'

// ** Type Import
import {
  ProfileTabType
} from 'src/types/profile/types'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Components
import Profile from 'src/views/pages/user-profile/profile'
import UserProfileHeader from 'src/views/pages/user-profile/UserProfileHeader'
import Follower from './follower'
import Follow from './follow'

const TabList = styled(MuiTabList)<TabListProps>(({ theme }) => ({
  '& .MuiTabs-indicator': {
    display: 'none'
  },
  '& .Mui-selected': {
    backgroundColor: theme.palette.primary.main,
    color: `${theme.palette.common.white} !important`
  },
  '& .MuiTab-root': {
    minWidth: 65,
    minHeight: 38,
    paddingTop: theme.spacing(2.5),
    paddingBottom: theme.spacing(2.5),
    borderRadius: theme.shape.borderRadius,
    [theme.breakpoints.up('sm')]: {
      minWidth: 130
    }
  }
}))

interface TabProps {
  tab: string
  data: ProfileTabType | null
  accountId?: string
}

const UserProfile = (props: TabProps) => {
  const { tab, data, accountId } = props

  // ** State
  const [activeTab, setActiveTab] = useState<string>(tab)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  // ** Hooks
  const router = useRouter()
  const hideText = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'))

  const handleChange = (event: SyntheticEvent, value: string) => {
    setIsLoading(true)
    setActiveTab(value)
    if (accountId !== undefined) {
      router
        .push({
          pathname: `/user-profile/${value.toLowerCase()}`,
          query: {
            accountId
          }
        }, undefined, {shallow: true})
        .then(() => setIsLoading(false))
    } else {
      router
        .push({
          pathname: `/user-profile/${value.toLowerCase()}`
        }, undefined, {shallow: true})
        .then(() => setIsLoading(false))
    }
  }

  useEffect(() => {
    if (data) {
      setIsLoading(false)
    }
  }, [data])

  useEffect(() => {
    if (tab && tab !== activeTab) {
      setActiveTab(tab)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab])

  const tabContentList: { [key: string]: ReactElement } = {
    profile: <Profile data={data as ProfileTabType} />,
    follow: <Follow data={data as ProfileTabType} />,
    follower: <Follower data={data as ProfileTabType} />
  }

  return data !== null ? (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <UserProfileHeader data={(data as ProfileTabType).header} />
      </Grid>
      {activeTab === undefined ? null : (
        <Grid item xs={12}>
          <TabContext value={activeTab}>
            <Grid container spacing={6}>
              <Grid item xs={12}>
                <TabList
                  variant='scrollable'
                  scrollButtons='auto'
                  onChange={handleChange}
                  aria-label='customized tabs example'
                >
                  <Tab
                    value='profile'
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center', ...(!hideText && { '& svg': { mr: 2 } }) }}>
                        <Icon fontSize={20} icon='mdi:account-outline' />
                        {!hideText && '프로필'}
                      </Box>
                    }
                  />
                  <Tab
                    value='follow'
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center', ...(!hideText && { '& svg': { mr: 2 } }) }}>
                        <Icon fontSize={20} icon='fluent-mdl2:follow-user' />
                        {!hideText && '팔로잉'}
                      </Box>
                    }
                  />
                  <Tab
                    value='follower'
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center', ...(!hideText && { '& svg': { mr: 2 } }) }}>
                        <Icon fontSize={20} icon='fluent-mdl2:follow-user' hFlip/>
                        {!hideText && '팔로워'}
                      </Box>
                    }
                  />
                </TabList>
              </Grid>
              <Grid item xs={12} sx={{ pt: theme => `${theme.spacing(4)} !important` }}>
                {isLoading ? (
                  <Box sx={{ mt: 6, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                    <CircularProgress sx={{ mb: 4 }} />
                    <Typography>Loading...</Typography>
                  </Box>
                ) : (
                  <TabPanel sx={{ p: 0 }} value={activeTab}>
                    {tabContentList[activeTab]}
                  </TabPanel>
                )}
              </Grid>
            </Grid>
          </TabContext>
        </Grid>
      )}
    </Grid>
  ) : null
}

export default UserProfile
