import { useState } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

// ** Third Party Imports
import { ApexOptions } from 'apexcharts'
import ReactApexcharts from 'src/@core/components/react-apexcharts'
import TextField from '@mui/material/TextField/TextField'
import { getStartDate } from 'src/common/getStartDateByDateOptions'

// ** Icon Imports
import Autocomplete from '@mui/material/Autocomplete/Autocomplete'
import { DateOption, dateOptions } from 'src/types/reactDatepickerTypes'

interface Props {
  cubeType: string
  options: ApexOptions
  series: number[]
  setStartDate: (date: Date) => void
}

const ApexDonutChart = (mainProps: Props) => {
  const { cubeType, options, series, setStartDate } = mainProps

  const [dateOptionOpen, setDateOptionOpen] = useState<boolean>(false)
  const [dateOption, setDateOption] = useState<DateOption>('최근 한 달')

  const handleOnChange = (dateOption: DateOption) => {
    setDateOption(dateOption)
    setStartDate(getStartDate(dateOption))
  }

  return (
    <Card>
      <CardHeader
        title={`${cubeType} 이벤트`}
        subheader={'상위 5개 아이템'}
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
        <ReactApexcharts type='donut' height={400} options={options} series={series} />
      </CardContent>
    </Card>
  )
}

export default ApexDonutChart
