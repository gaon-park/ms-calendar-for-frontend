import Typography from "@mui/material/Typography/Typography"
import Grid from "@mui/material/Grid/Grid"
import ApexBarChart from "./ApexBarChart"

const LegandaryGradeUpChart = () => {

    return (
        <Grid container spacing={6}>
            <Grid item xs={12}>
                <Typography variant='h5'>레전드리 등급업 확률
                </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
                <ApexBarChart
                    title={'레드 큐브'}
                    barColor={'#FF8C90'}
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <ApexBarChart
                    title={'블랙 큐브'}
                    barColor={'#9C9FA4'}
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <ApexBarChart
                    title={'에디셔널 큐브'}
                    barColor={'#93DD5C'}
                />
            </Grid>
        </Grid>
    )
}

export default LegandaryGradeUpChart