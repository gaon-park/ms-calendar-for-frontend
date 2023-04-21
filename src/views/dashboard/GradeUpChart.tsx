// ** React Imports
import { useEffect, useState } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

// ** Third Party Imports
import { ApexOptions } from 'apexcharts'

// ** Component Import
import ReactApexcharts from 'src/@core/components/react-apexcharts'
import Autocomplete from '@mui/material/Autocomplete/Autocomplete'

import useSWR from "swr"
import { GradeUpDashboardRequest } from 'src/common/api/msBackend/dashboard/dashboard'
import { GradeUpDashboard } from 'src/model/dashboard/dashboard'
import { AxiosResponse } from 'axios'
import { DateOption, dateOptions } from 'src/types/reactDatepickerTypes'
import { getStartDate } from 'src/common/getStartDateByDateOptions'

const options: ApexOptions = {
  chart: {
    type: 'bar',
    height: 800
  },
  plotOptions: {
    bar: {
      horizontal: true,
      dataLabels: {
        position: 'top',
      },
    }
  },
  dataLabels: {
    enabled: true,
    offsetX: 50,
    style: {
      fontSize: '11px',
      colors: ['#304758']
    },
    formatter: (val: number) => {
      return val.toFixed(4) + '%'
    },
  },
  stroke: {
    show: true,
    width: 1,
    colors: ['#fff']
  },
  tooltip: {
    shared: true,
    intersect: false
  },
  xaxis: {
    categories: [],
  },
  legend: {
    show: true,
  }
}

interface Props {
  title: string
  itemList?: string[]
  categories: string[]
  swrUrl: string
  api: (req: GradeUpDashboardRequest) => Promise<AxiosResponse<GradeUpDashboard, any>>
  cubeType: string
}

const GradeUpChart = (mainProps: Props) => {
  const { itemList, categories, swrUrl, api, cubeType } = mainProps
  const swrOptions = {
    revalidateIfStale: false,
    revalidateOnFocus: true,
    revalidateOnReconnect: true
  }

  // ** States
  const [itemOpen, setItemOpen] = useState<boolean>(false)

  const now = new Date()
  const initStart = new Date(now)
  initStart.setMonth(now.getMonth() - 1)
  const initEnd = new Date(now)
  initEnd.setDate(now.getDate() - 1)

  const [item, setItem] = useState<string>('')
  const [start, setStart] = useState<Date>(initStart)
  const [actualData, setActualData] = useState<number[]>([])
  const [expectedData, setExpectedData] = useState<number[]>([])

  const { data } = useSWR(
    { swrUrl, start },
    () => api(
      {
        startDate: start.toISOString().split("T")[0],
        endDate: initEnd.toISOString().split("T")[0],
        cubeType: cubeType,
        item: item
      }
    ),
    swrOptions
  )

  useEffect(() => {
    if (typeof data !== 'undefined') {
      const actual = []
      const expected = []
      if (data.data.epic.expected > 0) {
        actual.push(data.data.epic.actual)
        expected.push(data.data.epic.expected)
      }
      if (data.data.unique.expected > 0) {
        actual.push(data.data.unique.actual)
        expected.push(data.data.unique.expected)
      }
      if (data.data.legendary.expected > 0) {
        actual.push(data.data.legendary.actual)
        expected.push(data.data.legendary.expected)
      }
      setActualData(actual)
      setExpectedData(expected)
    }
  }, [data])

  const [dateOptionOpen, setDateOptionOpen] = useState<boolean>(false)
  const [dateOption, setDateOption] = useState<DateOption>('최근 한 달')

  const handleOnChange = (dateOption: DateOption) => {
    setDateOption(dateOption)
    setStart(getStartDate(dateOption))
  }

  return (
    <Card>
      <CardHeader
        title={mainProps.title}
        subheader={itemList !== undefined ? '아이템 선택 시 해당 아이템에 대한 확률' : null}
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
        {
          itemList !== undefined && setItem !== undefined ? <Autocomplete
            size='small'
            open={itemOpen}
            options={itemList}
            onChange={(e, newSelected) => setItem(newSelected ?? '')}
            onOpen={() => setItemOpen(true)}
            onClose={() => setItemOpen(false)}
            id='autocomplete-item'
            isOptionEqualToValue={(option, value) => option === value}
            renderInput={params => (
              <TextField
                {...params}
                label='아이템'
                InputProps={{
                  ...params.InputProps,
                }}
              />
            )}
          /> : null
        }
        <ReactApexcharts
          type='bar'
          height={400}
          options={{ ...options, xaxis: { categories: categories } }}
          series={[{
            name: '실제 확률',
            data: actualData
          }, {
            name: '설정 확률',
            data: expectedData
          }]}
        />
      </CardContent>
    </Card>
  )
}

export default GradeUpChart
