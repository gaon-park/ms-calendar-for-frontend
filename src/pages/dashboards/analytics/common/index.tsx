// ** MUI Imports
import Grid from '@mui/material/Grid'
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'
import { CubeOverviewRequest, GetCubeOverview, GetGradeUpDashboard, GetTopFive, GetWholeRecordDashboard, GetWholeRecordDashboardRequest, GradeUpDashboardRequest } from 'src/common/api/msBackend/dashboard/dashboard'
import { useProfile } from 'src/hooks/useProfile'
import ApexLineChart from 'src/views/dashboard/ApexLineChart'
import CubeCountCard from 'src/views/dashboard/CubeCountCard'
import GradeUpChart from 'src/views/dashboard/GradeUpChart'
import ItemCountChart from 'src/views/dashboard/ItemCountChart'

const RecordDashboardCommon = () => {
    useProfile()

    return (
        <Grid container spacing={6}>
            <Grid item xs={12}>
                <CubeCountCard
                    url={'/dashboards/analytics/common/cubeCount'}
                    api={(req: CubeOverviewRequest) => GetCubeOverview(req)}
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <GradeUpChart
                    title={'수상한 큐브 등급업 확률'}
                    categories={['에픽']}
                    cubeType={'수상한 큐브'}
                    swrUrl={'/dashboards/analytics/common/susang'}
                    api={(req: GradeUpDashboardRequest) => GetGradeUpDashboard(req)}
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <GradeUpChart
                    title={'수상한 에디셔널 큐브 등급업 확률'}
                    categories={['에픽']}
                    cubeType={'수상한 에디셔널 큐브'}
                    swrUrl={'/dashboards/analytics/common/susangAddi'}
                    api={(req: GradeUpDashboardRequest) => GetGradeUpDashboard(req)}
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <GradeUpChart
                    title={'장인의 큐브 등급업 확률'}
                    categories={['에픽', '유니크']}
                    cubeType={'장인의 큐브'}
                    swrUrl={'/dashboards/analytics/common/jangyin'}
                    api={(req: GradeUpDashboardRequest) => GetGradeUpDashboard(req)}
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <GradeUpChart
                    title={'명장의 큐브 등급업 확률'}
                    categories={['에픽', '유니크', '레전드리']}
                    cubeType={'명장의 큐브'}
                    swrUrl={'/dashboards/analytics/common/myungjang'}
                    api={(req: GradeUpDashboardRequest) => GetGradeUpDashboard(req)}
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <GradeUpChart
                    title={'레드 큐브 등급업 확률'}
                    categories={['에픽', '유니크', '레전드리']}
                    cubeType={'레드 큐브'}
                    swrUrl={'/dashboards/analytics/common/red'}
                    api={(req: GradeUpDashboardRequest) => GetGradeUpDashboard(req)}
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <GradeUpChart
                    title={'블랙 큐브 등급업 확률'}
                    categories={['에픽', '유니크', '레전드리']}
                    cubeType={'블랙 큐브'}
                    swrUrl={'/dashboards/analytics/common/black'}
                    api={(req: GradeUpDashboardRequest) => GetGradeUpDashboard(req)}
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <GradeUpChart
                    title={'에디셔널 큐브 등급업 확률'}
                    categories={['에픽', '유니크', '레전드리']}
                    cubeType={'에디셔널 큐브'}
                    swrUrl={'/dashboards/analytics/common/additional'}
                    api={(req: GradeUpDashboardRequest) => GetGradeUpDashboard(req)}
                />
            </Grid>

            <Grid item xs={12} md={12}>
                <ItemCountChart
                    urlBase='/dashboard/analytics/common'
                    apiCall={GetTopFive}
                />
            </Grid>
            <Grid item xs={12}>
                <ApexChartWrapper>
                    <ApexLineChart
                        url={'/dashboard/analytics/common/whole-data'}
                        api={(req: GetWholeRecordDashboardRequest) => GetWholeRecordDashboard(req)}
                    />
                </ApexChartWrapper>
            </Grid>
        </Grid>
    )
}

export default RecordDashboardCommon
