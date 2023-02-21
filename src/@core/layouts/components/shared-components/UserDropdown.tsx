// ** React Imports
import { useState, SyntheticEvent, Fragment } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** MUI Imports
import Box from '@mui/material/Box'
import Menu from '@mui/material/Menu'
import Badge from '@mui/material/Badge'
import Avatar from '@mui/material/Avatar'
import CustomAvatar from 'src/@core/components/mui/avatar'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Type Imports
import { Settings } from 'src/@core/context/settingsContext'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { myProfile } from 'src/store/profile/user'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'
import { AuthCookie } from 'src/common/cookie/cookies'
import { isAuthenticated } from 'src/store/auth'
import { IProfile } from 'src/model/user/profile'
import Button from '@mui/material/Button/Button'

interface Props {
  settings: Settings
}

// ** Styled Components
const BadgeContentSpan = styled('span')(({ theme }) => ({
  width: 8,
  height: 8,
  borderRadius: '50%',
  backgroundColor: theme.palette.success.main,
  boxShadow: `0 0 0 2px ${theme.palette.background.paper}`
}))

const UserDropdown = (props: Props) => {
  // ** Props
  const { settings } = props

  // ** States
  const [anchorEl, setAnchorEl] = useState<Element | null>(null)

  // ** Hooks
  const router = useRouter()
  const setIsAuth = useSetRecoilState<boolean>(isAuthenticated)
  const setMyProfile = useSetRecoilState<IProfile | undefined>(myProfile)

  // ** Vars
  const { direction } = settings
  const profile = useRecoilValue(myProfile)

  const handleDropdownOpen = (event: SyntheticEvent) => {
    setAnchorEl(event.currentTarget)
  }

  const handleDropdownClose = (url?: string) => {
    if (url) {
      router.push(url)
    }
    setAnchorEl(null)
  }

  const styles = {
    py: 2,
    px: 4,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    color: 'text.primary',
    textDecoration: 'none',
    '& svg': {
      mr: 2,
      fontSize: '1.375rem',
      color: 'text.primary'
    }
  }

  const handleLogout = () => {
    handleDropdownClose()
    new AuthCookie().clearCookies()
    setIsAuth(false)
    setMyProfile(undefined)
    router.push('/')
  }

  const handleLogin = () => {
    router.push('/login')
  }

  return profile !== undefined ? (
    <Fragment>
      <Badge
        overlap='circular'
        onClick={handleDropdownOpen}
        sx={{ ml: 2, cursor: 'pointer' }}
        badgeContent={<BadgeContentSpan />}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
      >
        {
          profile.avatarImg !== null ? (
            <Avatar
              alt={`${profile.nickName}_img`}
              onClick={handleDropdownOpen}
              sx={{ width: 40, height: 40 }}
              src={profile.avatarImg}
            />
          ) : (
            <CustomAvatar
              skin='light'
              color='primary'
              sx={{ width: 40, height: 40, fontSize: '.875rem' }}
            >
              {getInitials(profile.nickName)}
            </CustomAvatar>
          )
        }
      </Badge>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => handleDropdownClose()}
        sx={{ '& .MuiMenu-paper': { width: 230, mt: 4 } }}
        anchorOrigin={{ vertical: 'bottom', horizontal: direction === 'ltr' ? 'right' : 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: direction === 'ltr' ? 'right' : 'left' }}
      >
        <Box sx={{ pt: 2, pb: 3, px: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Badge
              overlap='circular'
              badgeContent={<BadgeContentSpan />}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right'
              }}
            >
              {
                profile.avatarImg !== null ? (
                  <Avatar alt={`${profile.nickName}_img`} src={profile.avatarImg} sx={{ width: '2.5rem', height: '2.5rem' }} />
                )
                  : (
                    <CustomAvatar skin='light' color='primary' sx={{ width: '2.5rem', height: '2.5rem' }} >
                      {getInitials(profile.nickName)}
                    </CustomAvatar>
                  )
              }
            </Badge>
            <Box sx={{ display: 'flex', ml: 3, alignItems: 'flex-start', flexDirection: 'column' }}>
              <Typography sx={{ fontWeight: 600 }}>{profile.nickName}</Typography>
              <Typography variant='body2' sx={{ fontSize: '0.8rem', color: 'text.disabled' }}>
                {`@${profile.accountId}`}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Divider sx={{ mt: '0 !important' }} />
        <MenuItem sx={{ p: 0 }} onClick={() => handleDropdownClose('/user-profile/profile/')}>
          <Box sx={styles}>
            <Icon icon='mdi:account-outline' />
            Profile
          </Box>
        </MenuItem>
        <MenuItem sx={{ p: 0 }} onClick={() => handleDropdownClose('/account-settings/account/')}>
          <Box sx={styles}>
            <Icon icon='mdi:cog-outline' />
            Settings
          </Box>
        </MenuItem>
        <Divider />
        <MenuItem
          onClick={handleLogout}
          sx={{ py: 2, '& svg': { mr: 2, fontSize: '1.375rem', color: 'text.primary' } }}
        >
          <Icon icon='mdi:logout-variant' />
          Logout
        </MenuItem>
      </Menu>
    </Fragment>
  )
    : (
      <Fragment>
        <Button
          onClick={handleLogin}
          sx={{ py: 2, '& svg': { mr: 2, fontSize: '1.375rem', color: 'text.primary' } }}
        >
          Login
        </Button>
        {/* </Menu> */}
      </Fragment>
    )
}

export default UserDropdown
