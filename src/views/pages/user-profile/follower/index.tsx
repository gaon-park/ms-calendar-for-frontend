// ** MUI Components
import Grid from '@mui/material/Grid'

// ** Types
import { ProfileTabType } from 'src/types/profile/types'
import Follower from './Follower'

const ProfileFollowerTab = ({ data }: { data: ProfileTabType }) => {
  return data && Object.values(data).length ? (
    <Grid container spacing={6}>
      <Grid item xl={12} md={12} xs={12}>
        <Follower followers={data.followers} />
      </Grid>
    </Grid>
  ) : null
}

export default ProfileFollowerTab
