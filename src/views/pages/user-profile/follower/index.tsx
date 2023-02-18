// ** MUI Components
import { Card } from '@mui/material'
import Grid from '@mui/material/Grid'

// ** Types
import { ProfileTabType } from 'src/types/profile/types'
import UserListComponent from '../../../UserListComponent'

const ProfileFollowerTab = ({ data }: { data: ProfileTabType }) => {
  return data && Object.values(data).length ? (
    <Grid container spacing={6}>
      <Grid item xl={12} md={12} xs={12}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <UserListComponent
                users={[]}
                fullHit={0}
                forFollower={true}
                updatedUser={() => console.log('updated')}
              />
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  ) : null
}

export default ProfileFollowerTab
