import Box from "@mui/material/Box/Box"
import Card from "@mui/material/Card/Card"
import CardContent from "@mui/material/CardContent/CardContent"
import Avatar from '@mui/material/Avatar'
import Typography from "@mui/material/Typography/Typography"
import { CubeOverviewResponse } from "src/model/dashboard/dashboard"
import Grid from "@mui/material/Grid/Grid"
import { CardHeader } from "@mui/material"
import { useEffect, useState } from "react"
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete/Autocomplete'

import { getStartDate } from 'src/common/getStartDateByDateOptions'

import useSWR from "swr"
import { DateOption, dateOptions } from "src/types/reactDatepickerTypes"
import { CubeOverviewRequest } from "src/common/api/msBackend/dashboard/dashboard"
import { AxiosResponse } from "axios"

interface DataType {
  title: string
  imgSrc: string
  count: number
}

interface Props {
  url: string
  api: (req: CubeOverviewRequest) => Promise<AxiosResponse<CubeOverviewResponse, any>>
}

const CubeCountCard = (props: Props) => {
  const {url, api} = props

  const now = new Date()
  const initStart = new Date(now)
  initStart.setMonth(now.getMonth() - 1)
  const initEnd = new Date(now)
  initEnd.setDate(now.getDate() - 1)

  const swrOptions = {
    revalidateIfStale: false,
    revalidateOnFocus: true,
    revalidateOnReconnect: true
  }

  const [start, setStart] = useState<Date>(initStart)
  const [cc, setCC] = useState<CubeOverviewResponse>()
  const [ccData, setCCData] = useState<DataType[]>([])

  const { data } = useSWR(
    { url, start },
    () => api(
      {
        startDate: start.toISOString().split("T")[0],
        endDate: initEnd.toISOString().split("T")[0]
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


  const [dateOptionOpen, setDateOptionOpen] = useState<boolean>(false)
  const [dateOption, setDateOption] = useState<DateOption>('최근 한 달')

  const handleOnChange = (dateOption: DateOption) => {
    setDateOption(dateOption)
    setStart(getStartDate(dateOption))
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