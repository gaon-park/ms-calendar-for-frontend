// ** MUI Components
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import { ProfileOverviewType } from 'src/types/profile/types'
import TableServerSide from 'src/views/dashboard/TableServerSide'
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'
import ApexLineChart from 'src/views/dashboard/ApexLineChart'
import { useState, useEffect } from 'react'
import { GetItemDashboardPersonal, GetWholeRecordDashboardPersonal } from 'src/common/api/msBackend/dashboard/dashboard'
import { CubeHistoryResponse } from 'src/model/dashboard/dashboard'

import useSWR from "swr"
import { ApexOptions } from 'apexcharts'
import { useTheme } from '@mui/material/styles'

const areaColors = {
  red: '#FF8C90',
  black: '#9C9FA4',
  additional: '#93DD5C'
}

const renderOverview = (overviewType: ProfileOverviewType) => {
  const { profile, followCount, followerCount } = overviewType
  const overview = [
    { property: '계정ID', value: profile.accountId, icon: 'openmoji:id-button' },
    { property: '닉네임', value: profile.nickName, icon: 'openmoji:european-name-badge' },
    { property: '팔로잉', value: followCount, icon: 'fluent-mdl2:follow-user' },
    { property: '팔로워', value: followerCount, icon: 'fluent-mdl2:follow-user' },
  ]

  return overview.map((item, index) => {
    return (
      <Box
        key={index}
        sx={{
          display: 'flex',
          alignItems: 'center',
          '&:not(:last-of-type)': { mb: 4 },
          '& svg': { color: 'text.secondary' }
        }}
      >
        {
          item.property === '팔로워' ? <Icon icon={item.icon} hFlip /> : <Icon icon={item.icon} />
        }

        <Typography sx={{ mx: 2, fontWeight: 600, color: 'text.secondary' }}>
          {`${item.property.charAt(0).toUpperCase() + item.property.slice(1)}:`}
        </Typography>
        <Typography sx={{ color: 'text.secondary' }}>
          {item.value}
        </Typography>
      </Box>
    )
  })
}

interface Props {
  overview: ProfileOverviewType
}

export interface SeryType {
  name: string
  data: number[]
}

const AboutOverivew = (props: Props) => {

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Box sx={{ mb: 6 }}>
              <Typography variant='caption' sx={{ mb: 5, display: 'block', textTransform: 'uppercase' }}>
                소개
              </Typography>
              {renderOverview(props.overview)}
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default AboutOverivew
