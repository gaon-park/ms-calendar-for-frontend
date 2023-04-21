// ** Third Party Imports
import { ApexOptions } from 'apexcharts'

// ** Component Import
import { useEffect, useState } from 'react'
import { TopFiveDashboardRequest } from 'src/common/api/msBackend/dashboard/dashboard'
import { ItemCount } from 'src/model/dashboard/dashboard'
import { AxiosResponse } from 'axios'

import useSWR from "swr"
import Grid from '@mui/material/Grid/Grid'
import CustomDataLabelChart from './CustomDataLabelChart'

const options: ApexOptions = {
  chart: {
    type: 'donut',
  },
  responsive: [
    {
      breakpoint: 992,
      options: {
        chart: {
          height: 380
        },
        legend: {
          position: 'bottom'
        }
      }
    },
    {
      breakpoint: 576,
      options: {
        chart: {
          height: 320
        },
        plotOptions: {
          pie: {
            donut: {
              labels: {
                show: true,
                name: {
                  fontSize: '1rem'
                },
                value: {
                  fontSize: '1rem'
                },
                total: {
                  fontSize: '1rem'
                }
              }
            }
          }
        }
      }
    }
  ]
}

interface Props {
  urlBase: string
  apiCall: (req: TopFiveDashboardRequest) => Promise<AxiosResponse<ItemCount[], any>>
}

const ItemCountChart = (mainProps: Props) => {
  const { urlBase, apiCall } = mainProps

  const now = new Date()
  const start = new Date(now)
  start.setMonth(now.getMonth() - 1)
  const end = new Date(now)
  end.setDate(now.getDate() - 1)

  const [startDateForTopFiveR, setStartDateForTopFiveR] = useState<Date>(start)
  const [seriesForTopFiveR, setSeriesForTopFiveR] = useState<number[]>([])
  const [labelForTopFiveR, setLabelForTopFiveR] = useState<string[]>()

  const [startDateForTopFiveB, setStartDateForTopFiveB] = useState<Date>(start)
  const [seriesForTopFiveB, setSeriesForTopFiveB] = useState<number[]>([])
  const [labelForTopFiveB, setLabelForTopFiveB] = useState<string[]>()

  const [startDateForTopFiveA, setStartDateForTopFiveA] = useState<Date>(start)
  const [seriesForTopFiveA, setSeriesForTopFiveA] = useState<number[]>([])
  const [labelForTopFiveA, setLabelForTopFiveA] = useState<string[]>()

  const swrOptions = {
    revalidateIfStale: false,
    revalidateOnFocus: true,
    revalidateOnReconnect: true
  }

  const redUrl = urlBase + '/red'
  const { data: red } = useSWR(
    { redUrl, startDateForTopFiveR },
    () => apiCall({
      cubeType: '레드 큐브',
      startDate: startDateForTopFiveR.toISOString().split("T")[0],
      endDate: end.toISOString().split("T")[0]
    }),
    swrOptions
  )

  useEffect(() => {
    if (typeof red !== 'undefined') {
      setSeriesForTopFiveR(red.data.map(o => o.count))
      setLabelForTopFiveR(red.data.map(o => o.item))
    }
  }, [red])

  const blackUrl = urlBase + '/black'
  const { data: black } = useSWR(
    { blackUrl, startDateForTopFiveB },
    () => apiCall({
      cubeType: '블랙 큐브',
      startDate: startDateForTopFiveB.toISOString().split("T")[0],
      endDate: end.toISOString().split("T")[0]
    }),
    swrOptions
  )

  useEffect(() => {
    if (typeof black !== 'undefined') {
      setSeriesForTopFiveB(black.data.map(o => o.count))
      setLabelForTopFiveB(black.data.map(o => o.item))
    }
  }, [black])

  const additionalUrl = urlBase + '/additional'
  const { data: additional } = useSWR(
    { additionalUrl, startDateForTopFiveA },
    () => apiCall({
      cubeType: '에디셔널 큐브',
      startDate: startDateForTopFiveA.toISOString().split("T")[0],
      endDate: end.toISOString().split("T")[0]
    }),
    swrOptions
  )

  useEffect(() => {
    if (typeof additional !== 'undefined') {
      setSeriesForTopFiveA(additional.data.map(o => o.count))
      setLabelForTopFiveA(additional.data.map(o => o.item))
    }
  }, [additional])

  return (
    <Grid container spacing={6}>
      {
        (typeof labelForTopFiveR !== 'undefined' && labelForTopFiveR.length > 0)
          ? <Grid item xs={12} md={6}>
            <CustomDataLabelChart
              cubeType={'레드 큐브'}
              options={{ ...options, labels: labelForTopFiveR }}
              series={seriesForTopFiveR}
              setStartDate={(date: Date) => setStartDateForTopFiveR(date)}
            />
          </Grid>
          : null
      }
      {
        (typeof labelForTopFiveB !== 'undefined' && labelForTopFiveB.length > 0)
          ? <Grid item xs={12} md={6}>
            <CustomDataLabelChart
              cubeType={'블랙 큐브'}
              options={{ ...options, labels: labelForTopFiveB }}
              series={seriesForTopFiveB}
              setStartDate={(date: Date) => setStartDateForTopFiveB(date)}
            />
          </Grid>
          : null
      }
      {
        (typeof labelForTopFiveA !== 'undefined' && labelForTopFiveA.length > 0)
          ? <Grid item xs={12} md={6}>
            <CustomDataLabelChart
              cubeType={'에디셔널 큐브'}
              options={{ ...options, labels: labelForTopFiveA }}
              series={seriesForTopFiveA}
              setStartDate={(date: Date) => setStartDateForTopFiveA(date)}
            />
          </Grid>
          : null
      }
    </Grid>
  )
}

export default ItemCountChart
