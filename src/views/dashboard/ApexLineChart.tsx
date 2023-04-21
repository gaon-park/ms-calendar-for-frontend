// ** React Imports
import { forwardRef, useEffect, useState } from 'react'

// ** MUI Imports
import { useTheme } from '@mui/material/styles'
import Card from '@mui/material/Card'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import InputAdornment from '@mui/material/InputAdornment'

// ** Third Party Imports
import format from 'date-fns/format'
import { ApexOptions } from 'apexcharts'
import DatePicker from 'react-datepicker'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Component Import
import ReactApexcharts from 'src/@core/components/react-apexcharts'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import { GetWholeRecordDashboardRequest } from 'src/common/api/msBackend/dashboard/dashboard'

import useSWR from "swr"
import { AxiosResponse } from 'axios'
import { WholeRecordDashboardResponse } from 'src/model/dashboard/dashboard'

interface PickerProps {
  start: Date | number
  end: Date | number
}

interface SeryType {
  name: string
  data: number[]
}

interface MainProps {
  url: string
  api: (req: GetWholeRecordDashboardRequest) => Promise<AxiosResponse<WholeRecordDashboardResponse, any>>
}

const areaColors = {
  red: '#FF8C90',
  black: '#9C9FA4',
  additional: '#93DD5C'
}

const ApexAreaChart = (mainProps: MainProps) => {
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

  const {url, api} = mainProps

  const now = new Date()
  const end = new Date(now)
  end.setDate(now.getDate() - 1)

  const [startDate, setStartDate] = useState<Date>(new Date(2022, 10, 25))
  const [endDate, setEndDate] = useState<Date>(end)
  const [options, setOptions] = useState<ApexOptions>(initialData)
  const [series, setSeries] = useState<SeryType[]>([])

  const swrOptions = {
    revalidateIfStale: false,
    revalidateOnFocus: true,
    revalidateOnReconnect: true
  }

  const { data } = useSWR(
    { url, startDate, endDate },
    () => api({
      startDate: startDate.toISOString().split("T")[0],
      endDate: endDate.toISOString().split("T")[0]
    }),
    swrOptions
  )

  useEffect(() => {
    if (typeof data !== 'undefined') {
      const categories = data.data.categories
      setOptions({
        ...initialData, xaxis: {
          ...initialData.xaxis, categories: categories
        }
      })

      const res = data.data.data

      const red = res.filter((o) => o.cubeType === '레드 큐브').map((o) => o.count)
      const black = res.filter((o) => o.cubeType === '블랙 큐브').map((o) => o.count)
      const additional = res.filter((o) => o.cubeType === '에디셔널 큐브').map((o) => o.count)

      setSeries([
        { name: "레드 큐브", data: red },
        { name: "블랙 큐브", data: black },
        { name: "에디셔널 큐브", data: additional }
      ])
    }
  }, [data])

  const CustomInput = forwardRef((props: PickerProps, ref) => {
    const startDate = props.start !== null ? format(props.start, 'MM/dd/yyyy') : ''
    const endDate = props.end !== null ? ` - ${format(props.end, 'MM/dd/yyyy')}` : null

    const value = `${startDate}${endDate !== null ? endDate : ''}`

    return (
      <TextField
        {...props}
        size='small'
        value={value}
        inputRef={ref}
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <Icon icon='mdi:bell-outline' />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position='end'>
              <Icon icon='mdi:chevron-down' />
            </InputAdornment>
          )
        }}
      />
    )
  })

  const handleOnChange = (dates: any) => {
    const [start, end] = dates
    setStartDate(start)
    setEndDate(end)
  }

  return (
    <Card>
      <CardHeader
        title='선형 그래프'
        subheader='2022/11/25부터 어제까지의 집계된 모든 큐브 데이터 검색 가능(선택 기간이 4개월 이상인 경우, 달별 데이터로 조회합니다)'
        subheaderTypographyProps={{ sx: { color: theme => `${theme.palette.text.disabled} !important` } }}
        sx={{
          flexDirection: ['column', 'row'],
          alignItems: ['flex-start', 'center'],
          '& .MuiCardHeader-action': { mb: 0 },
          '& .MuiCardHeader-content': { mb: [2, 0] }
        }}
        action={
          <DatePickerWrapper>
            <DatePicker
              selectsRange
              endDate={endDate}
              id='apexchart-area'
              selected={startDate}
              startDate={startDate}
              onChange={handleOnChange}
              placeholderText='기간 선택'
              customInput={<CustomInput start={startDate as Date | number} end={endDate as Date | number} />}
            />
          </DatePickerWrapper>
        }
      />
      <CardContent>
        <ReactApexcharts type='line' height={400} options={options} series={series} />
      </CardContent>
    </Card>
  )
}

export default ApexAreaChart
