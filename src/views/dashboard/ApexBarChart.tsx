// ** React Imports
import { forwardRef, useState } from 'react'

// ** MUI Imports
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
import Autocomplete from '@mui/material/Autocomplete/Autocomplete'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

interface PickerProps {
  start: Date | number
  end: Date | number
}

const options: ApexOptions = {
  chart: {
    type: 'bar',
    height: 430
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
    offsetX: -6,
    style: {
      fontSize: '12px',
      colors: ['#fff']
    },
    formatter: (val: number) => {
      return val.toFixed(3) + '%'
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
    categories: ['레드 큐브', '블랙 큐브', '에디셔널 큐브'],
  },
  legend: {
    show: true,
  }
}

interface Props {
  title: string
  itemList?: string[]
  setItem?: (o: string) => void
  startDate: Date
  endDate: Date
  setStartDate: (o: Date) => void
  setEndDate: (o: Date) => void
  actualData: number[]
  expectedData: number[]
}

const ApexBarChart = (mainProps: Props) => {
  // ** States
  const [itemOpen, setItemOpen] = useState<boolean>(false)

  const { itemList, setItem, startDate, endDate, setStartDate, setEndDate, actualData, expectedData } = mainProps

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
        title={mainProps.title}
        subheader={setItem !== undefined ? '아이템 선택 시 해당 아이템에 대한 확률' : null}
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
              id='apexchart-bar'
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
          options={options}
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

export default ApexBarChart
