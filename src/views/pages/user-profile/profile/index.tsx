// ** MUI Components
import Grid from '@mui/material/Grid'

// ** Demo Components
import AboutOverivew from 'src/views/pages/user-profile/profile/AboutOverivew'

// ** Types
import { ProfileTabType } from 'src/common/types/types'

const ProfileTab = ({ data }: { data: ProfileTabType }) => {
  return data && Object.values(data).length ? (
    <Grid container spacing={6}>
      <Grid item xl={12} md={12} xs={12}>
        <AboutOverivew overview={data.overview} />
      </Grid>
    </Grid>
  ) : null
}

export default ProfileTab
