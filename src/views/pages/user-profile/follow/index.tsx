// ** MUI Components
import Card from '@mui/material/Card/Card'
import Grid from '@mui/material/Grid'
import { useState } from 'react'
import { IProfile } from 'src/model/user/profile'

// ** Types
import { ProfileTabType } from 'src/types/profile/types'
import UserListComponent from '../../../UserListComponent'

const ProfileFollowerTab = ({ data }: { data: ProfileTabType }) => {
  const [users, setUsers] = useState<IProfile[]>(data.follows)

  return data && Object.values(data).length ? (
    <Grid container spacing={6}>
      <Grid item xl={12} md={12} xs={12}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <UserListComponent
                users={users}
                forFollower={false}
                isMyData={data.isMyData}
                updatedUser={(updated: IProfile) => {
                  setUsers(users.map((obj) => {
                    if (obj.id === updated.id) return updated

                    return obj
                  }))
                }}
              />
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  ) : null
}

export default ProfileFollowerTab
