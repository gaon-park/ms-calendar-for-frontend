// ** MUI Components
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import { ProfileOverviewType } from 'src/types/profile/types'

// ** Type Import


const renderOverview = (overviewType: ProfileOverviewType) => {
  const {profile, followCount, followerCount} = overviewType
  const overview = [
    { property: '계정ID', value: profile.accountId, icon: 'openmoji:id-button' },
    { property: '닉네임', value: profile.nickName, icon: 'openmoji:european-name-badge' },
    { property: '월드', value: profile.world, icon: 'clarity:world-line' },
    { property: '직업', value: profile.jobDetail ?? profile.job, icon: 'mdi:briefcase-outline' },
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
          item.property === '팔로워' ? <Icon icon={item.icon} hFlip/> : <Icon icon={item.icon} />
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
