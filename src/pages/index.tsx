// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { useProfile } from 'src/hooks/useProfile'

const Home = () => {
  useProfile()

  return (
    <Grid container spacing={6}>
      
    </Grid>
  )
}

export default Home
