// ** React Imports
import { forwardRef, useState } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import TextField from '@mui/material/TextField'
import { useTheme } from '@mui/material/styles'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import InputAdornment from '@mui/material/InputAdornment'

// ** Third Party Imports
import format from 'date-fns/format'
import { ApexOptions } from 'apexcharts'
import DatePicker from 'react-datepicker'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Types
import { DateType } from 'src/types/reactDatepickerTypes'

// ** Component Import
import ReactApexcharts from 'src/@core/components/react-apexcharts'
import Autocomplete from '@mui/material/Autocomplete/Autocomplete'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

interface PickerProps {
  start: Date | number
  end: Date | number
}

const ApexBarChart = () => {
  // ** States
  const [endDate, setEndDate] = useState<DateType>(null)
  const [startDate, setStartDate] = useState<DateType>(null)

  // ** Hook
  const theme = useTheme()

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
      }
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
        title='레전드리 등급업 확률'
        subheader='아이템 선택 시 해당 아이템에 대한 확률'
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
              placeholderText='Click to select a date'
              customInput={<CustomInput start={startDate as Date | number} end={endDate as Date | number} />}
            />
          </DatePickerWrapper>
        }
      />
      <CardContent>
        <Autocomplete
          size='small'
          open={false}
          options={[]}
          onChange={(e, newSelected) => console.log('selected')}
          // onOpen={() => setItemOpen(true)}
          // onClose={() => setItemOpen(false)}
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
        />
        <ReactApexcharts
          type='bar'
          height={400}
          options={options}
          series={[{
            name: '실제 확률',
            data: [44, 55, 41]
          }, {
            name: '설정 확률',
            data: [53, 32, 33]
          }]}
        />
      </CardContent>
    </Card>
  )
}

export default ApexBarChart
