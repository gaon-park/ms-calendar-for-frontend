// ** MUI Components
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Types
import { ProfileHeaderType } from 'src/types/profile/types'
import { useRouter } from 'next/router'
import { CustomAvatarProps } from 'src/@core/components/mui/avatar/types'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'

const ProfilePicture = styled(CustomAvatar)<CustomAvatarProps>(({ theme }) => ({
  width: 120,
  height: 120,
  borderRadius: theme.shape.borderRadius,
  border: `5px solid ${theme.palette.common.white}`,
  [theme.breakpoints.down('md')]: {
    marginBottom: theme.spacing(4)
  },
  backgroundColor: theme.palette.background.default,
  '& svg': {
    fontSize: '1.75rem'
  },
}))

const UserProfileHeader = ({ data }: { data: ProfileHeaderType }) => {
  const router = useRouter()

  return (
    <Card>
      <CardMedia
        component='img'
        alt='profile-header'
        // todo coverImg
        image={'/images/pages/profile-banner.png'}
        sx={{
          height: { xs: 150, md: 250 }
        }}
      />
      <CardContent
        sx={{
          pt: 0,
          mt: -8,
          display: 'flex',
          alignItems: 'flex-end',
          flexWrap: { xs: 'wrap', md: 'nowrap' },
          justifyContent: { xs: 'center', md: 'flex-start' }
        }}
      >
        {
          data.avatarImg !== '' && data.avatarImg !== null ? (
            <ProfilePicture src={data.avatarImg} alt='profile-picture' />
          )
            : (
              <ProfilePicture alt='profile-picture' skin='light' color='primary' >
                {getInitials(data.nickName)}
              </ProfilePicture>
            )
        }

        <Box
          sx={{
            width: '100%',
            display: 'flex',
            ml: { xs: 0, md: 6 },
            alignItems: 'flex-end',
            flexWrap: ['wrap', 'nowrap'],
            justifyContent: ['center', 'space-between']
          }}
        >
          <Box sx={{ mb: [6, 0], display: 'flex', flexDirection: 'column', alignItems: ['center', 'flex-start'] }}>
            <Typography variant='h5' sx={{ mb: 4 }}>
              {data.nickName}
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: ['center', 'flex-start']
              }}
            >
              <Box sx={{ mr: 5, display: 'flex', alignItems: 'center', '& svg': { mr: 1, color: 'text.secondary' } }}>
                <Icon icon='mdi:briefcase-outline' />
                <Typography sx={{ ml: 1, color: 'text.secondary', fontWeight: 600 }}>{data.job}</Typography>
              </Box>
              <Box sx={{ mr: 5, display: 'flex', alignItems: 'center', '& svg': { mr: 1, color: 'text.secondary' } }}>
                <Icon icon='mdi:map-marker-outline' />
                <Typography sx={{ ml: 1, color: 'text.secondary', fontWeight: 600 }}>{data.world}</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', '& svg': { mr: 1, color: 'text.secondary' } }}>
                <Icon icon='mdi:calendar-blank' />
                <Typography sx={{ ml: 1, color: 'text.secondary', fontWeight: 600 }}>
                  Joined {new Date(data.createdAt).toDateString()}
                </Typography>
              </Box>
            </Box>
          </Box>
          <Button variant='contained' startIcon={<Icon icon='mdi:cog-outline' fontSize={20} />} onClick={() => router.push('/account-settings/account/')}>
            ACCOUNT_EDIT
          </Button>
        </Box>
      </CardContent>
    </Card>
  )
}

export default UserProfileHeader
