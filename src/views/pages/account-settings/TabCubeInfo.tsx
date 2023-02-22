// ** React Imports
import { ReactNode, useEffect, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import TableContainer from '@mui/material/TableContainer'

import useSWR from "swr";

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'

// ** Components
import CreateApiKey from 'src/views/pages/account-settings/cube/CreateApiKey'
import { ApiKeyResponse } from 'src/model/user/profile'
import { GetApiKey } from 'src/common/api/msBackend/user/profile'

interface ApiKeyListType {
  title: string
  access: string
  date: string
  key: string
}

interface RecentDeviceDataType {
  date: string
  device: string
  location: string
  browserName: string
  browserIcon: ReactNode
}

const apiKeyList: ApiKeyListType[] = [
  {
    title: 'Server Key 1',
    access: 'Full Access',
    date: '28 Apr 2021, 18:20 GTM+4:10',
    key: '23eaf7f0-f4f7-495e-8b86-fad3261282ac'
  }
]

const recentDeviceData: RecentDeviceDataType[] = [
  {
    location: 'Switzerland',
    device: 'HP Spectre 360',
    date: '10, July 2021 20:07',
    browserName: 'Chrome on Windows',
    browserIcon: (
      <Box component='span' sx={{ mr: 2.5, '& svg': { color: 'info.main' } }}>
        <Icon icon='mdi:microsoft-windows' fontSize={20} />
      </Box>
    )
  },
]

const TabCubeInfo = () => {
  const [apiKey, setApiKey] = useState<ApiKeyResponse | undefined>(undefined)

  const { data } = useSWR(
    {}, GetApiKey, {
    revalidateIfStale: false,
    revalidateOnFocus: true,
    revalidateOnReconnect: true
  })

  useEffect(() => {
    if (data !== undefined && data.data !== undefined) {
      setApiKey(data.data)
    }
  }, [data])

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <CreateApiKey />
      </Grid>

      {/* API Key List & Access Card*/}
      {
        apiKey !== undefined ? (
          <Grid item xs={12}>
            <Card>
              <CardHeader title='등록 정보 확인' />
              <CardContent>
                <Box
                  sx={{ p: 4, borderRadius: 1, backgroundColor: 'action.hover', '&:not(:last-child)': { mb: 4 } }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant='h6' sx={{ mr: 3 }}>
                      API KEY
                    </Typography>
                    <CustomChip
                      size='small'
                      skin='light'
                      color='primary'
                      label={apiKey.isValid ? '유효!' : '만료..'}
                      sx={{ textTransform: 'uppercase' }}
                    />
                  </Box>
                  <Box sx={{ my: 2.5, display: 'flex', alignItems: 'center' }}>
                    <Typography display="block" sx={{ mr: 3, color: 'text.secondary', fontWeight: 600 }}>{apiKey.apiKey}</Typography>
                    <Box component='span' sx={{ display: 'flex', cursor: 'pointer', color: 'text.secondary' }}>
                      <Icon icon='mdi:content-copy' fontSize='1rem' />
                    </Box>
                  </Box>
                  <Typography sx={{ color: 'text.secondary' }}>생성: {apiKey.createdAt.replace('T', ' ')}</Typography>
                  <Typography sx={{ color: 'text.secondary' }}>만료: {apiKey.expiredAt.replace('T', ' ')}</Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ) : null
      }
    </Grid>
  )
}
export default TabCubeInfo
