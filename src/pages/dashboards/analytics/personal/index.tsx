// ** MUI Imports
import Grid from '@mui/material/Grid'
import { useTheme } from '@mui/material/styles'
import { ApexOptions } from 'apexcharts'
import { useEffect, useState } from 'react'
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'
import { GetGradeUpDashboardPersonal, GetItemFilterOptions, GetTopFivePersonal, GetWholeRecordDashboardPersonal, GradeUpDashboardRequest } from 'src/common/api/msBackend/dashboard/dashboard'
import { useProfile } from 'src/hooks/useProfile'
import ApexLineChart from 'src/views/dashboard/ApexLineChart'
import CubeCountCard from 'src/views/dashboard/CubeCountCard'
import GradeUpChart from 'src/views/dashboard/GradeUpChart'
import ItemCountChart from 'src/views/dashboard/ItemCountChart'
import { SeryType } from 'src/views/pages/user-profile/profile/AboutOverivew'

import useSWR from "swr"

const areaColors = {
  red: '#FF8C90',
  black: '#9C9FA4',
  additional: '#93DD5C'
}

const RecordDashboardCommon = () => {
  useProfile()

  // ** Hook
  const theme = useTheme()

  const initialData: ApexOptions = {
    chart: {
      height: 350,
      type: 'line',
      zoom: {
        enabled: false
      },
    },
    dataLabels: {
      enabled: false
    },
    legend: {
      position: 'top',
      horizontalAlign: 'left',
      labels: { colors: theme.palette.text.secondary },
      markers: {
        offsetY: 1,
        offsetX: -3
      },
      itemMargin: {
        vertical: 3,
        horizontal: 10
      }
    },
    markers: {
      size: 0,
      hover: {
        sizeOffset: 6
      }
    },
    colors: [areaColors.red, areaColors.black, areaColors.additional],
    xaxis: {
      axisBorder: { show: false },
      axisTicks: { color: theme.palette.divider },
      crosshairs: {
        stroke: { color: theme.palette.divider }
      },
      labels: {
        style: { colors: theme.palette.text.disabled }
      },
      categories: []
    }
  }

  const now = new Date()
  const start = new Date(now)
  start.setMonth(now.getMonth() - 1)
  const end = new Date(now)
  end.setDate(now.getDate() - 1)

  const [startDate, setStartDate] = useState<Date>(new Date(2022, 10, 25))
  const [endDate, setEndDate] = useState<Date>(end)
  const [options, setOptions] = useState<ApexOptions>(initialData)
  const [series, setSeries] = useState<SeryType[]>([])

  const url = '/dashboards/analytics/personal'

  const swrOptions = {
    revalidateIfStale: false,
    revalidateOnFocus: true,
    revalidateOnReconnect: true
  }

  const { data: wholeData } = useSWR(
    { url, startDate, endDate },
    () => GetWholeRecordDashboardPersonal({
      startDate: startDate.toISOString().split("T")[0],
      endDate: endDate.toISOString().split("T")[0]
    }),
    swrOptions
  )

  useEffect(() => {
    if (typeof wholeData !== 'undefined') {
      const categories = wholeData.data.categories
      setOptions({
        ...initialData, xaxis: {
          ...initialData.xaxis, categories: categories
        }
      })

      const res = wholeData.data.data

      const red = res.filter((o) => o.cubeType === '레드 큐브').map((o) => o.count)
      const black = res.filter((o) => o.cubeType === '블랙 큐브').map((o) => o.count)
      const additional = res.filter((o) => o.cubeType === '에디셔널 큐브').map((o) => o.count)

      setSeries([
        { name: "레드 큐브", data: red },
        { name: "블랙 큐브", data: black },
        { name: "에디셔널 큐브", data: additional }
      ])
    }
  }, [wholeData])

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
            startDate={startDate}
            endDate={endDate}
            setStartDate={(o) => setStartDate(o)}
            setEndDate={(o) => setEndDate(o)}
            options={options}
            series={series}
          />
        </ApexChartWrapper>
      </Grid>
    </Grid>
  )
}

export default RecordDashboardCommon
