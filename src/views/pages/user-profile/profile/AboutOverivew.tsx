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

const renderOverview = (profile: ProfileOverviewType) => {

  const overview = [
    { property: 'Account Id', value: profile.accountId, icon: 'openmoji:id-button' },
    { property: 'NickName', value: profile.nickName, icon: 'openmoji:european-name-badge' },
    { property: 'World', value: profile.world, icon: 'clarity:world-line' },
    { property: 'Job', value: profile.jobDetail ?? profile.job, icon: 'mdi:briefcase-outline' },
    { property: 'Follow', value: '', icon: 'fluent-mdl2:follow-user' },
    { property: 'Follower', value: '', icon: 'fluent-mdl2:follow-user' },
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
          item.property === 'Follower' ? <Icon icon={item.icon} hFlip/> : <Icon icon={item.icon} />
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
