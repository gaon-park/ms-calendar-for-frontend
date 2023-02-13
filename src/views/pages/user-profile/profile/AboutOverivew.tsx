// ** MUI Components
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Type Import
import { ProfileOverviewType } from 'src/types/profile/types'

import friendStatus from 'src/model/friendStatus'

const renderOverview = (profile: ProfileOverviewType) => {

  const overview = [
    { property: 'Account Id', value: profile.accountId, icon: 'mdi:account-outline' },
    { property: 'NickName', value: profile.nickName, icon: 'mdi:account-outline' },
    { property: 'Friend Status', value: '', icon: 'mdi:check' },
    { property: 'World', value: profile.world, icon: 'mdi:account-group-outline' },
    { property: 'Job', value: profile.jobDetail ?? profile.job, icon: 'mdi:briefcase-outline' }
  ]

  return overview.map((item, index) => {
    if (item.property === 'Friend Status' && profile.holderFlg) return null
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
        <Icon icon={item.icon} />

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

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Box sx={{ mb: 6 }}>
              <Typography variant='caption' sx={{ mb: 5, display: 'block', textTransform: 'uppercase' }}>
                About
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
