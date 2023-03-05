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

interface Props {
  title: string
  barColor: string
}

const ApexBarChart = (mainProps: Props) => {
  // ** States
  const [endDate, setEndDate] = useState<DateType>(null)
  const [startDate, setStartDate] = useState<DateType>(null)

  // ** Hook
  const theme = useTheme()

  const options: ApexOptions = {
    chart: {
      parentHeightOffset: 0,
      toolbar: { show: false }
    },
    colors: [mainProps.barColor],
    dataLabels: {
      formatter: (val: number, opt) => {
        const goals =
          opt.w.config.series[opt.seriesIndex].data[opt.dataPointIndex]
            .goals

        if (goals && goals.length) {
          return `${val} / ${goals[0].value}`
        }
        return val
      }
    },
    plotOptions: {
      bar: {
        borderRadius: 8,
        barHeight: '30%',
        horizontal: true,
        startingShape: 'rounded'
      }
    },
    grid: {
      borderColor: theme.palette.divider,
      xaxis: {
        lines: { show: false }
      },
      padding: {
        top: -10
      }
    },
    yaxis: {
      labels: {
        style: { colors: theme.palette.text.disabled }
      }
    },
    xaxis: {
      axisBorder: { show: false },
      axisTicks: { color: theme.palette.divider },
      labels: {
        style: { colors: theme.palette.text.disabled }
      }
    },
    legend: {
      show: true,
      showForSingleSeries: true,
      customLegendItems: ['Actual', 'Expected'],
      markers: {
        fillColors: [mainProps.barColor, '#00E396']
      }
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
        title={mainProps.title}
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
          series={[
            {
              name: 'Actual',
              data: [
                {
                  x: '2022/11',
                  y: 44,
                  goals: [
                    {
                      name: 'Expected',
                      value: 54,
                      strokeWidth: 5,
                      strokeHeight: 10,
                      strokeColor: '#00E396'
                    }
                  ]
                },
                {
                  x: '2022/12',
                  y: 44,
                  goals: [
                    {
                      name: 'Expected',
                      value: 54,
                      strokeWidth: 5,
                      strokeHeight: 10,
                      strokeColor: '#00E396'
                    }
                  ]
                },
                {
                  x: '2023/01',
                  y: 44,
                  goals: [
                    {
                      name: 'Expected',
                      value: 54,
                      strokeWidth: 5,
                      strokeHeight: 10,
                      strokeColor: '#00E396'
                    }
                  ]
                },
              ]
            }
          ]}
        />
      </CardContent>
    </Card>
  )
}

export default ApexBarChart
