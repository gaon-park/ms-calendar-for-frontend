import Box from "@mui/material/Box/Box"
import Card from "@mui/material/Card/Card"
import CardContent from "@mui/material/CardContent/CardContent"
import Avatar from '@mui/material/Avatar'
import Typography from "@mui/material/Typography/Typography"
import { CubeCount } from "src/model/dashboard/dashboard"
import Grid from "@mui/material/Grid/Grid"
import { CardHeader } from "@mui/material"
import { forwardRef } from "react"
import format from 'date-fns/format'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import DatePicker from 'react-datepicker'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

interface Props {
  registeredApiKeyCount: number | null
  cc: CubeCount
  startDate: Date
  endDate: Date
  setStartDate: (date: Date) => void
  setEndDate: (date: Date) => void
}

interface DataType {
  title: string
  imgSrc: string
  count: number
  imgWidth: number
  imgHeight: number
}

interface PickerProps {
  start: Date | number
  end: Date | number
}

const CubeCountCard = (mainProps: Props) => {
  const { registeredApiKeyCount, cc } = mainProps
  const { startDate, endDate, setStartDate, setEndDate } = mainProps

  const data: DataType[] = [
    {
      title: '수상한 큐브',
      imgSrc: '/images/cube/susang.png',
      count: cc.susangCount,
      imgWidth: 30,
      imgHeight: 30,
    },
    {
      title: '장인의 큐브',
      imgSrc: '/images/cube/jangyin.png',
      count: cc.jangyinCount,
      imgWidth: 30,
      imgHeight: 30,
    },
    {
      title: '명장의 큐브',
      imgSrc: '/images/cube/myungjang.png',
      count: cc.myungjangCount,
      imgWidth: 30,
      imgHeight: 30,
    },
    {
      title: '레드 큐브',
      imgSrc: '/images/cube/red.png',
      count: cc.redCount,
      imgWidth: 35,
      imgHeight: 30,
    },
    {
      title: '블랙 큐브',
      imgSrc: '/images/cube/black.png',
      count: cc.blackCount,
      imgWidth: 35,
      imgHeight: 30,
    },
    {
      title: '에디셔널 큐브',
      imgSrc: '/images/cube/additional.png',
      count: cc.additionalCount,
      imgWidth: 35,
      imgHeight: 30,
    }
  ]

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
        title={`기간 중 수집된 큐브 이벤트: ` + (registeredApiKeyCount !== null ? ` ${registeredApiKeyCount.toLocaleString()} 명이 ` : ` `) + cc.allCount.toLocaleString() + '회'}
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
        <Grid container spacing={6}>
          {
            data.map((o, index) => (
              <Grid item xs={12} sm={6} md={4} key={`cubeCount_${index}`}>
                <Card sx={{ backgroundColor: 'transparent' }}>
                  <CardContent>
                    <Box key={index}
                      sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
                      <Box sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
                        <Avatar variant='square' alt='Mary Vaughn' src={o.imgSrc} sx={{ width: o.imgWidth, height: o.imgHeight, mr: 2.75 }} />
                        <Typography>
                          {o.title}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant='body2'>
                          {`${o.count.toLocaleString()} 회`}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))
          }
        </Grid>
      </CardContent>
    </Card>
  )
}

export default CubeCountCard