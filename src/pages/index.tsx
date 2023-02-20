// ** MUI Imports
import Grid from '@mui/material/Grid'
import { useProfile } from 'src/hooks/useProfile'
import CardPost from 'src/views/ui/CardPost'
import CardMeetingSchedule from 'src/views/ui/CardMeetingSchedule'

const Home = () => {
  useProfile()

  return (
    <Grid container spacing={6}>
      <Grid 
      	sx={{ display: { xs: 'none', md: 'block', lg: 'block' } }}
      item sm={4} md={4}>
        <CardMeetingSchedule />
      </Grid>
      <Grid item xs={12} md={8}>
        <CardPost />
      </Grid>
    </Grid>
  )
}

export default Home
