// ** MUI Imports
import Grid from '@mui/material/Grid'
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'
import { useProfile } from 'src/hooks/useProfile'
import ApexAreaChart from 'src/views/dashboard/ApexAreaChart'
import TableServerSide from 'src/views/dashboard/TableServerSide'

const Home = () => {
  useProfile()

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <TableServerSide />
      </Grid>
      <Grid item xs={12}>
      <ApexChartWrapper>
        <ApexAreaChart />
      </ApexChartWrapper>
      </Grid>
    </Grid>
  )
}

export default Home
