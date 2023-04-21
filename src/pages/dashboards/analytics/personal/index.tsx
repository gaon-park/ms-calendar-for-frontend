// ** MUI Imports
import Grid from '@mui/material/Grid'
import { useEffect, useState } from 'react'
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'
import { GetGradeUpDashboardPersonal, GetItemFilterOptions, GetTopFivePersonal, GetWholeRecordDashboardPersonal, GetWholeRecordDashboardRequest, GradeUpDashboardRequest } from 'src/common/api/msBackend/dashboard/dashboard'
import { useProfile } from 'src/hooks/useProfile'
import ApexLineChart from 'src/views/dashboard/ApexLineChart'
import CubeCountCard from 'src/views/dashboard/CubeCountCard'
import GradeUpChart from 'src/views/dashboard/GradeUpChart'
import ItemCountChart from 'src/views/dashboard/ItemCountChart'

import useSWR from "swr"

const RecordDashboardCommon = () => {
  useProfile()

  const url = '/dashboards/analytics/personal'

  const swrOptions = {
    revalidateIfStale: false,
    revalidateOnFocus: true,
    revalidateOnReconnect: true
  }

  const [itemList, setItemList] = useState<string[]>([])
  const { data: itemListData } = useSWR(
    url + '/item-list',
    GetItemFilterOptions,
    swrOptions
  )

  useEffect(() => {
    if (typeof itemListData !== 'undefined') {
      setItemList(itemListData.data)
    }
  }, [itemListData])

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <CubeCountCard />
      </Grid>
      <Grid item xs={12} md={6}>
        <GradeUpChart
          title={'수상한 큐브 등급업 확률'}
          categories={['에픽']}
          cubeType={'수상한 큐브'}
          swrUrl={'/dashboards/analytics/personal/susang'}
          itemList={itemList}
          api={(req: GradeUpDashboardRequest) => GetGradeUpDashboardPersonal(req)}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <GradeUpChart
          title={'수상한 에디셔널 큐브 등급업 확률'}
          categories={['에픽']}
          cubeType={'수상한 에디셔널 큐브'}
          swrUrl={'/dashboards/analytics/personal/susangAddi'}
          itemList={itemList}
          api={(req: GradeUpDashboardRequest) => GetGradeUpDashboardPersonal(req)}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <GradeUpChart
          title={'장인의 큐브 등급업 확률'}
          categories={['에픽', '유니크']}
          cubeType={'장인의 큐브'}
          swrUrl={'/dashboards/analytics/common/jangyin'}
          itemList={itemList}
          api={(req: GradeUpDashboardRequest) => GetGradeUpDashboardPersonal(req)}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <GradeUpChart
          title={'명장의 큐브 등급업 확률'}
          categories={['에픽', '유니크', '레전드리']}
          cubeType={'명장의 큐브'}
          swrUrl={'/dashboards/analytics/personal/myungjang'}
          itemList={itemList}
          api={(req: GradeUpDashboardRequest) => GetGradeUpDashboardPersonal(req)}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <GradeUpChart
          title={'레드 큐브 등급업 확률'}
          categories={['에픽', '유니크', '레전드리']}
          cubeType={'레드 큐브'}
          swrUrl={'/dashboards/analytics/personal/red'}
          itemList={itemList}
          api={(req: GradeUpDashboardRequest) => GetGradeUpDashboardPersonal(req)}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <GradeUpChart
          title={'블랙 큐브 등급업 확률'}
          categories={['에픽', '유니크', '레전드리']}
          cubeType={'블랙 큐브'}
          swrUrl={'/dashboards/analytics/personal/black'}
          itemList={itemList}
          api={(req: GradeUpDashboardRequest) => GetGradeUpDashboardPersonal(req)}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <GradeUpChart
          title={'에디셔널 큐브 등급업 확률'}
          categories={['에픽', '유니크', '레전드리']}
          cubeType={'에디셔널 큐브'}
          swrUrl={'/dashboards/analytics/personal/additional'}
          itemList={itemList}
          api={(req: GradeUpDashboardRequest) => GetGradeUpDashboardPersonal(req)}
        />
      </Grid>
      <Grid item xs={12} md={12}>
        <ItemCountChart
          urlBase='/dashboard/analytics/personal'
          apiCall={GetTopFivePersonal}
        />
      </Grid>
      <Grid item xs={12}>
        <ApexChartWrapper>
          <ApexLineChart
            url={'/dashboard/analytics/personal/whole-data'}
            api={(req: GetWholeRecordDashboardRequest) => GetWholeRecordDashboardPersonal(req)}
          />
        </ApexChartWrapper>
      </Grid>
    </Grid>
  )
}

export default RecordDashboardCommon
