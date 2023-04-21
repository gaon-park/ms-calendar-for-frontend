// ** React Imports
import { useEffect, useState } from 'react'

// ** MUI Imports
import { useTheme } from '@mui/material/styles'
import Card from '@mui/material/Card'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

// ** Third Party Imports
import { ApexOptions } from 'apexcharts'

// ** Component Import
import ReactApexcharts from 'src/@core/components/react-apexcharts'
import { GetWholeRecordDashboardRequest } from 'src/common/api/msBackend/dashboard/dashboard'

import useSWR from "swr"
import { AxiosResponse } from 'axios'
import { WholeRecordDashboardResponse } from 'src/model/dashboard/dashboard'
import Autocomplete from '@mui/material/Autocomplete/Autocomplete'
import { DateOption, dateOptions } from 'src/types/reactDatepickerTypes'
import { getStartDate } from 'src/common/getStartDateByDateOptions'

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

  const { url, api } = mainProps

  const now = new Date()
  const start = new Date(now)
  start.setMonth(now.getMonth() - 1)
  const end = new Date(now)
  end.setDate(now.getDate() - 1)

  const [startDate, setStartDate] = useState<Date>(start)
  const [options, setOptions] = useState<ApexOptions>(initialData)
  const [series, setSeries] = useState<SeryType[]>([])

  const swrOptions = {
    revalidateIfStale: false,
    revalidateOnFocus: true,
    revalidateOnReconnect: true
  }

  const { data } = useSWR(
    { url, startDate },
    () => api({
      startDate: startDate.toISOString().split("T")[0],
      endDate: end.toISOString().split("T")[0]
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

  const [dateOptionOpen, setDateOptionOpen] = useState<boolean>(false)
  const [dateOption, setDateOption] = useState<DateOption>('최근 한 달')

  const handleOnChange = (dateOption: DateOption) => {
    setDateOption(dateOption)
    setStartDate(getStartDate(dateOption))
  }

  return (
    <Card>
      <CardHeader
        title='선형 그래프'
        subheader='2022/11/25부터 어제까지의 집계된 모든 큐브 데이터 검색 가능(전체 기간을 선택하는 경우, 달별 데이터로 조회)'
        subheaderTypographyProps={{ sx: { color: theme => `${theme.palette.text.disabled} !important` } }}
        sx={{
          flexDirection: ['column', 'row'],
          alignItems: ['flex-start', 'center'],
          '& .MuiCardHeader-action': { mb: 0 },
          '& .MuiCardHeader-content': { mb: [2, 0] }
        }}
        action={
          <Autocomplete
            sx={{ width: 300 }}
            open={dateOptionOpen}
            options={dateOptions}
            value={dateOption}
            onChange={(e, newSelected) => handleOnChange(newSelected ?? '최근 한 달')}
            onOpen={() => setDateOptionOpen(true)}
            onClose={() => setDateOptionOpen(false)}
            id='autocomplete-item'
            isOptionEqualToValue={(option, value) => option === value}
            renderInput={params => (
              <TextField
                {...params}
                label='검색 기간'
                InputProps={{
                  ...params.InputProps,
                }}
              />
            )}
          />
        }
      />
      <CardContent>
        <ReactApexcharts type='line' height={400} options={options} series={series} />
      </CardContent>
    </Card>
  )
}

export default ApexAreaChart
