// ** MUI Imports
import Grid from '@mui/material/Grid'
import { useProfile } from 'src/hooks/useProfile'

const Home = () => {
  useProfile()

  return (
    <Grid container spacing={6}>
      
    </Grid>
  )
}

export default Home
