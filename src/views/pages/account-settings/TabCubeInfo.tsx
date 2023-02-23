// ** React Imports
import { useEffect, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

import useSWR from "swr";

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'

// ** Components
import CreateApiKey from 'src/views/pages/account-settings/cube/CreateApiKey'
import { ApiKeyResponse } from 'src/model/user/profile'
import { GetApiKey } from 'src/common/api/msBackend/user/profile'
import { useProfile } from 'src/hooks/useProfile'

const TabCubeInfo = () => {
  const [apiKey, setApiKey] = useState<ApiKeyResponse | null>(null)
  const { profile } = useProfile()

  const { data } = useSWR(
    'api-key', GetApiKey, {
    revalidateIfStale: false,
    revalidateOnFocus: true,
    revalidateOnReconnect: true
  })

  useEffect(() => {
    if (data !== undefined && typeof data.data !== 'string') {
      setApiKey(data.data)
    }
  }, [data])

  return profile !== undefined ? (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <CreateApiKey />
      </Grid>

      {/* API Key List & Access Card*/}
      {
        apiKey !== null && typeof apiKey !== 'string' ? (
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
                  <Typography sx={{ color: 'text.secondary' }}>생성: {apiKey.createdAt !== undefined ? apiKey.createdAt.replace('T', ' ') : ''}</Typography>
                  <Typography sx={{ color: 'text.secondary' }}>만료: {apiKey.expiredAt !== undefined ? apiKey.expiredAt.replace('T', ' ') : ''}</Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ) : null
      }
    </Grid>
  ) : null
}
export default TabCubeInfo
