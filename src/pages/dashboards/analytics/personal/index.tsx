// ** MUI Imports
import Grid from '@mui/material/Grid'
import { useTheme } from '@mui/material/styles'
import { ApexOptions } from 'apexcharts'
import { useEffect, useState } from 'react'
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'
import { GetCubeOverviewPersonal, GetGradeUpDashboardPersonal, GetItemFilterOptions, GetTopFivePersonal, GetWholeRecordDashboardPersonal } from 'src/common/api/msBackend/dashboard/dashboard'
import { useProfile } from 'src/hooks/useProfile'
import { CubeOverviewResponse } from 'src/model/dashboard/dashboard'
import ApexBarChart from 'src/views/dashboard/ApexBarChart'
import ApexLineChart from 'src/views/dashboard/ApexLineChart'
import CubeCountCard from 'src/views/dashboard/CubeCountCard'
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

  const [cubeOverview, setCubeOverview] = useState<CubeOverviewResponse>()
  const cubeOverviewUrl = url + '/personal/cubeOverview'
  const [startDateForOverview, setStartDateForOverview] = useState<Date>(start)
  const [endDateForOverview, setEndDateForOverview] = useState<Date>(end)

  const { data: cubeCounts } = useSWR(
    { cubeOverviewUrl, startDateForOverview, endDateForOverview },
    () => GetCubeOverviewPersonal(
      {
        startDate: startDateForOverview.toISOString().split("T")[0],
        endDate: endDateForOverview.toISOString().split("T")[0]
      }
    ),
    swrOptions
  )

  useEffect(() => {
    if (typeof cubeCounts !== 'undefined') {
      setCubeOverview(cubeCounts.data)
    }
  }, [cubeCounts])

  const [itemList, setItemList] = useState<string[]>([])
  const [itemL, setItemL] = useState<string>('')
  const [startDateForGradeUpL, setStartDateForGradeUpL] = useState<Date>(start)
  const [endDateForGradeUpL, setEndDateForGradeUpL] = useState<Date>(end)
  const [actualGradeDataL, setActualGradeDataL] = useState<number[]>([])
  const [expectedGradeDataL, setExpectedGradeDataL] = useState<number[]>([])

  const [itemU, setItemU] = useState<string>('')
  const [startDateForGradeUpU, setStartDateForGradeUpU] = useState<Date>(start)
  const [endDateForGradeUpU, setEndDateForGradeUpU] = useState<Date>(end)
  const [actualGradeDataU, setActualGradeDataU] = useState<number[]>([])
  const [expectedGradeDataU, setExpectedGradeDataU] = useState<number[]>([])

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

  const gradeUpUrlL = '/dashboards/analytics/personal/gradeUp/l'
  const { data: gradeUpDataL } = useSWR(
    { gradeUpUrlL, itemL, startDateForGradeUpL, endDateForGradeUpL },
    () => GetGradeUpDashboardPersonal(
      {
        item: itemL,
        startDate: startDateForGradeUpL.toISOString().split("T")[0],
        endDate: endDateForGradeUpL.toISOString().split("T")[0],
        grade: "유니크",
        nextGrade: "레전드리"
      }
    ),
    swrOptions
  )

  useEffect(() => {
    if (typeof gradeUpDataL !== 'undefined') {
      const data = gradeUpDataL.data
      setActualGradeDataL([data.myungjang.actual, data.red.actual, data.black.actual, data.additional.actual])
      setExpectedGradeDataL([data.myungjang.expected, data.red.expected, data.black.expected, data.additional.expected])
    }
  }, [gradeUpDataL])

  const gradeUpUrlU = '/dashboards/analytics/personal/gradeUp/u'
  const { data: gradeUpDataU } = useSWR(
    { gradeUpUrlU, itemU, startDateForGradeUpU, endDateForGradeUpU },
    () => GetGradeUpDashboardPersonal(
      {
        item: itemU,
        startDate: startDateForGradeUpU.toISOString().split("T")[0],
        endDate: endDateForGradeUpU.toISOString().split("T")[0],
        grade: "에픽",
        nextGrade: "유니크"
      }
    ),
    swrOptions
  )

  useEffect(() => {
    if (typeof gradeUpDataU !== 'undefined') {
      const data = gradeUpDataU.data
      setActualGradeDataU([data.jangyin.actual, data.myungjang.actual, data.red.actual, data.black.actual, data.additional.actual])
      setExpectedGradeDataU([data.jangyin.expected, data.myungjang.expected, data.red.expected, data.black.expected, data.additional.expected])
    }
  }, [gradeUpDataU])

  const [itemE, setItemE] = useState<string>('')
  const [startDateForGradeUpE, setStartDateForGradeUpE] = useState<Date>(start)
  const [endDateForGradeUpE, setEndDateForGradeUpE] = useState<Date>(end)
  const [actualGradeDataE, setActualGradeDataE] = useState<number[]>([])
  const [expectedGradeDataE, setExpectedGradeDataE] = useState<number[]>([])

  const gradeUpUrlE = '/dashboards/analytics/common/gradeUp/e'
  const { data: gradeUpDataE } = useSWR(
    { gradeUpUrlE, startDateForGradeUpE, endDateForGradeUpE },
    () => GetGradeUpDashboardPersonal(
      {
        item: itemE,
        startDate: startDateForGradeUpE.toISOString().split("T")[0],
        endDate: endDateForGradeUpE.toISOString().split("T")[0],
        grade: "레어",
        nextGrade: "에픽"
      }
    ),
    swrOptions
  )

  useEffect(() => {
    if (typeof gradeUpDataE !== 'undefined') {
      const data = gradeUpDataE.data
      setActualGradeDataE([data.susang.actual, data.jangyin.actual, data.myungjang.actual, data.red.actual, data.black.actual, data.additional.actual])
      setExpectedGradeDataE([data.susang.expected, data.jangyin.expected, data.myungjang.expected, data.red.expected, data.black.expected, data.additional.expected])
    }
  }, [gradeUpDataE])
  
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        {cubeOverview !== undefined ?
          <CubeCountCard
            cc={cubeOverview.counts}
            registeredApiKeyCount={cubeOverview.registeredApiKeyCount}
            startDate={startDateForOverview}
            endDate={endDateForOverview}
            setStartDate={setStartDateForOverview}
            setEndDate={setEndDateForOverview}
          /> : null}
      </Grid>
      <Grid item xs={12} md={6}>
        <ApexBarChart
          title={'레전드리 등급업 확률'}
          itemList={itemList}
          setItem={setItemL}
          startDate={startDateForGradeUpL}
          endDate={endDateForGradeUpL}
          setStartDate={setStartDateForGradeUpL}
          setEndDate={setEndDateForGradeUpL}
          categories={['명장의 큐브', '레드 큐브', '블랙 큐브', '에디셔널 큐브']}
          actualData={actualGradeDataL}
          expectedData={expectedGradeDataL}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <ApexBarChart
          title={'유니크 등급업 확률'}
          itemList={itemList}
          setItem={setItemU}
          startDate={startDateForGradeUpU}
          endDate={endDateForGradeUpU}
          setStartDate={setStartDateForGradeUpU}
          setEndDate={setEndDateForGradeUpU}
          categories={['장인의 큐브', '명장의 큐브', '레드 큐브', '블랙 큐브', '에디셔널 큐브']}
          actualData={actualGradeDataU}
          expectedData={expectedGradeDataU}
        />
      </Grid>
      <Grid item xs={12} md={12}>
        <ApexBarChart
          title={'에픽 등급업 확률'}
          itemList={itemList}
          setItem={setItemE}
          startDate={startDateForGradeUpE}
          endDate={endDateForGradeUpE}
          setStartDate={setStartDateForGradeUpE}
          setEndDate={setEndDateForGradeUpE}
          categories={['수상한 큐브', '장인의 큐브', '명장의 큐브', '레드 큐브', '블랙 큐브', '에디셔널 큐브']}
          actualData={actualGradeDataE}
          expectedData={expectedGradeDataE}
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
