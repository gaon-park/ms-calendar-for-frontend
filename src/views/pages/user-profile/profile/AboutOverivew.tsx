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
import ApexAreaChart from 'src/views/dashboard/ApexAreaChart'
import { useState, useEffect } from 'react'
import { GetItemDashboardPersonal } from 'src/common/api/msBackend/dashboard/dashboard'
import { CubeHistoryResponse } from 'src/model/dashboard/dashboard'

import useSWR from "swr"

const renderOverview = (overviewType: ProfileOverviewType) => {
  const { profile, followCount, followerCount, isMyData } = overviewType
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

const AboutOverivew = (props: Props) => {

  const [rows, setRows] = useState<CubeHistoryResponse[]>([])
  const [itemList, setItemList] = useState<string[]>([])
  const [item, setItem] = useState<string>('')
  const [cube, setCube] = useState<string>('')
  const [option1, setOption1] = useState<string>('')
  const [option2, setOption2] = useState<string>('')
  const [option3, setOption3] = useState<string>('')
  const [optionValue1, setOptionValue1] = useState<number>(0)
  const [optionValue2, setOptionValue2] = useState<number>(0)
  const [optionValue3, setOptionValue3] = useState<number>(0)

  const { data } = useSWR(
    (props.overview.isMyData ? { item, cube, option1, option2, option3, optionValue1, optionValue2, optionValue3 } : null),
    () => GetItemDashboardPersonal({
      item, cube, option1, option2, option3, optionValue1, optionValue2, optionValue3
    }),
    {
      revalidateIfStale: false,
      revalidateOnFocus: true,
      revalidateOnReconnect: true
    }
  )

  useEffect(() => {
    if (typeof data !== 'undefined') {
      setRows(data.data.cubeHistories)
      setItemList(data.data.itemList)
    }
  }, [data])

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
      {
        props.overview.isMyData ? <Grid item xs={12}>
          <TableServerSide
            rows={rows}
            itemList={itemList}
            item={item}
            setItem={(o: string) => setItem(o)}
            cube={cube}
            setCube={(o: string) => setCube(o)}
            option1={option1}
            setOption1={(o: string) => setOption1(o)}
            option2={option2}
            setOption2={(o: string) => setOption2(o)}
            option3={option3}
            setOption3={(o: string) => setOption3(o)}
            setOptionValue1={(o: number) => setOptionValue1(o)}
            setOptionValue2={(o: number) => setOptionValue2(o)}
            setOptionValue3={(o: number) => setOptionValue3(o)}
          />
        </Grid> : null
      }
      {
        props.overview.isMyData ? <Grid item xs={12}>
          <ApexChartWrapper>
            <ApexAreaChart />
          </ApexChartWrapper>
        </Grid> : null
      }
    </Grid>
  )
}

export default AboutOverivew
