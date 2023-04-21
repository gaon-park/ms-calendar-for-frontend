import Box from "@mui/material/Box/Box"
import Card from "@mui/material/Card/Card"
import CardContent from "@mui/material/CardContent/CardContent"
import Avatar from '@mui/material/Avatar'
import Typography from "@mui/material/Typography/Typography"
import { CubeCount, CubeOverviewResponse } from "src/model/dashboard/dashboard"
import Grid from "@mui/material/Grid/Grid"
import { CardHeader } from "@mui/material"
import { forwardRef, useEffect, useState } from "react"
import format from 'date-fns/format'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import DatePicker from 'react-datepicker'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import { GetCubeOverview } from "src/common/api/msBackend/dashboard/dashboard"

import useSWR from "swr"

interface DataType {
  title: string
  imgSrc: string
  count: number
}

interface PickerProps {
  start: Date | number
  end: Date | number
}

const CubeCountCard = () => {
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

  const now = new Date()
  const initStart = new Date(now)
  initStart.setMonth(now.getMonth() - 3)
  const initEnd = new Date(now)
  initEnd.setDate(now.getDate() - 1)

  const swrOptions = {
    revalidateIfStale: false,
    revalidateOnFocus: true,
    revalidateOnReconnect: true
  }

  const cubeOverviewUrl = '/dashboards/analytics/common/cubeCount'
  const [start, setStart] = useState<Date>(initStart)
  const [end, setEnd] = useState<Date>(initEnd)
  const [cc, setCC] = useState<CubeOverviewResponse>()
  const [ccData, setCCData] = useState<DataType[]>([])

  const { data } = useSWR(
    { cubeOverviewUrl, start, end },
    () => GetCubeOverview(
      {
        startDate: start.toISOString().split("T")[0],
        endDate: end.toISOString().split("T")[0]
      }
    ),
    swrOptions
  )

  useEffect(() => {
    if (typeof data !== 'undefined') {
      setCC(data.data)
      const ccData = data.data.counts
      const initialData: DataType[] = [
        {
          title: '수상한 큐브',
          imgSrc: 'https://lwi.nexon.com/maplestory/common/guide/cube/cube_icon04.png',
          count: ccData.susangCount
        },
        {
          title: '수상한 에디셔널 큐브',
          imgSrc: 'https://lwi.nexon.com/maplestory/common/guide/cube/cube_icon_2730002.png',
          count: ccData.susangAdditionalCount
        },
        {
          title: '장인의 큐브',
          imgSrc: 'https://lwi.nexon.com/maplestory/common/guide/cube/cube_icon05.png',
          count: ccData.jangyinCount
        },
        {
          title: '명장의 큐브',
          imgSrc: 'https://lwi.nexon.com/maplestory/common/guide/cube/cube_icon06.png',
          count: ccData.myungjangCount
        },
        {
          title: '레드 큐브',
          imgSrc: 'https://lwi.nexon.com/maplestory/common/guide/cube/cube_icon01.png',
          count: ccData.redCount
        },
        {
          title: '블랙 큐브',
          imgSrc: 'https://lwi.nexon.com/maplestory/common/guide/cube/cube_icon02.png',
          count: ccData.blackCount
        },
        {
          title: '에디셔널 큐브',
          imgSrc: 'https://lwi.nexon.com/maplestory/common/guide/cube/cube_icon03.png',
          count: ccData.additionalCount
        }
      ]
      setCCData(initialData)
    }
  }, [data])

  const handleOnChange = (dates: any) => {
    const [start, end] = dates
    setStart(start)
    setEnd(end)
  }

  return (
    <Card>
      <CardHeader
        title={`기간 중 수집된 큐브 이벤트: ` + (cc != undefined && cc?.registeredApiKeyCount !== null ? ` ${cc?.registeredApiKeyCount.toLocaleString()} 명이 ` : ` `) + cc?.counts.allCount.toLocaleString() + '회'}
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
              endDate={end}
              id='apexchart-bar'
              selected={start}
              startDate={start}
              onChange={handleOnChange}
              placeholderText='기간 선택'
              customInput={<CustomInput start={start as Date | number} end={end as Date | number} />}
            />
          </DatePickerWrapper>
        }
      />
      <CardContent>
        <Grid container spacing={6}>
          {
            ccData.map((o, index) => (
              <Grid item xs={12} sm={6} md={4} key={`cubeCount_${index}`}>
                <Card sx={{ backgroundColor: 'transparent' }}>
                  <CardContent>
                    <Box key={index}
                      sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
                      <Box sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
                        <Avatar variant='square' alt='Mary Vaughn' src={o.imgSrc} sx={{ mr: 2.75 }} />
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