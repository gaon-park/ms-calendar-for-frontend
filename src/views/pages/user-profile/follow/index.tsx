// ** MUI Components
import Grid from '@mui/material/Grid'

// ** Types
import { ProfileTabType } from 'src/types/profile/types'
import Follow from './Follow'

const ProfileFollowTab = ({ data }: { data: ProfileTabType }) => {
  return data && Object.values(data).length ? (
    <Grid container spacing={6}>
      <Grid item xl={12} md={12} xs={12}>
        <Follow followers={data.follows} />
      </Grid>
    </Grid>
  ) : null
}

export default ProfileFollowTab
