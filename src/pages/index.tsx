// ** MUI Imports
import Grid from '@mui/material/Grid'
import { useTheme } from '@mui/material/styles'
import { ApexOptions } from 'apexcharts'
import { useEffect, useState } from 'react'
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'
import { GetItemDashboard, GetWholeRecordDashboard } from 'src/common/api/msBackend/dashboard/dashboard'
import { useProfile } from 'src/hooks/useProfile'
import { CubeHistoryResponse } from 'src/model/dashboard/dashboard'
import ApexLineChart from 'src/views/dashboard/ApexLineChart'
import TableServerSide from 'src/views/dashboard/TableServerSide'
import { SeryType } from 'src/views/pages/user-profile/profile/AboutOverivew'

import useSWR from "swr"

const areaColors = {
  red: '#FF8C90',
  black: '#9C9FA4',
  additional: '#93DD5C'
}

const Home = () => {
  useProfile()

  const [rows, setRows] = useState<CubeHistoryResponse[]>([])
  const [itemList, setItemList] = useState<string[]>([])
  const [item, setItem] = useState<string>('')
  const [cube, setCube] = useState<string>('')
  const [option1, setOption1] = useState<string>('')
  const [option2, setOption2] = useState<string>('')
  const [option3, setOption3] = useState<string>('')
  const [optionValue1, setOptionValue1] = useState<number>(0)
  const [optionValue2, setOptionValue2] = useState<number>(0)
  const [optionValue3, setOptionValue3] = useState<number>(0)

  const { data } = useSWR(
    { item, cube, option1, option2, option3, optionValue1, optionValue2, optionValue3 },
    () => GetItemDashboard({
      item, cube, option1, option2, option3, optionValue1, optionValue2, optionValue3
    }),
    {
      revalidateIfStale: false,
      revalidateOnFocus: true,
      revalidateOnReconnect: true
    }
  )

  useEffect(() => {
    if (typeof data !== 'undefined') {
      setRows(data.data.cubeHistories)
      setItemList(data.data.itemList)
    }
  }, [data])


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

  const [startDate, setStartDate] = useState<Date>(new Date('2022-11-25'))
  const [endDate, setEndDate] = useState<Date>(new Date())
  const [options, setOptions] = useState<ApexOptions>(initialData)
  const [series, setSeries] = useState<SeryType[]>([])

  const { data: wholeData } = useSWR(
    { startDate, endDate },
    () => GetWholeRecordDashboard({
      startDate: startDate.toISOString().split("T")[0],
      endDate: endDate.toISOString().split("T")[0]
    }),
    {
      revalidateIfStale: false,
      revalidateOnFocus: true,
      revalidateOnReconnect: true
    }
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

      const red = res.filter((o) => o.cubeType === 'RED').map((o) => o.count)
      const black = res.filter((o) => o.cubeType === 'BLACK').map((o) => o.count)
      const additional = res.filter((o) => o.cubeType === 'ADDITIONAL').map((o) => o.count)

      setSeries([
        { name: "레드 큐브", data: red },
        { name: "블랙 큐브", data: black },
        { name: "에디셔널 큐브", data: additional }
      ])
    }
  }, [wholeData])

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <TableServerSide
          rows={rows}
          itemList={itemList}
          item={item}
          setItem={(o: string) => setItem(o)}
          cube={cube}
          setCube={(o: string) => setCube(o)}
          option1={option1}
          setOption1={(o: string) => setOption1(o)}
          option2={option2}
          setOption2={(o: string) => setOption2(o)}
          option3={option3}
          setOption3={(o: string) => setOption3(o)}
          setOptionValue1={(o: number) => setOptionValue1(o)}
          setOptionValue2={(o: number) => setOptionValue2(o)}
          setOptionValue3={(o: number) => setOptionValue3(o)}
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

export default Home
