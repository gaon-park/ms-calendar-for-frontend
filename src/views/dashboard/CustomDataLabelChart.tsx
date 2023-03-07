import { forwardRef } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

// ** Third Party Imports
import format from 'date-fns/format'
import { ApexOptions } from 'apexcharts'
import ReactApexcharts from 'src/@core/components/react-apexcharts'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import TextField from '@mui/material/TextField/TextField'
import InputAdornment from '@mui/material/InputAdornment/InputAdornment'
import DatePicker from 'react-datepicker'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

interface Props {
  cubeType: string
  options: ApexOptions
  series: number[]
  startDate: Date
  endDate: Date
  setStartDate: (date: Date) => void
  setEndDate: (date: Date) => void
}

interface PickerProps {
  start: Date | number
  end: Date | number
}

const ApexDonutChart = (mainProps: Props) => {
  const { cubeType, options, series, startDate, endDate, setStartDate, setEndDate } = mainProps

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
        title={cubeType + '이벤트'}
        subheader={'상위 5개 아이템'}
        subheaderTypographyProps={{ sx: { color: theme => `${theme.palette.text.disabled} !important` } }}
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
        <ReactApexcharts type='donut' height={400} options={options} series={series} />
      </CardContent>
    </Card>
  )
}

export default ApexDonutChart
