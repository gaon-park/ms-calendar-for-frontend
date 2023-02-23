// ** MUI Imports
import Grid from '@mui/material/Grid'
import { useEffect, useState } from 'react'
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'
import { GetItemDashboard } from 'src/common/api/msBackend/dashboard/dashboard'
import { useProfile } from 'src/hooks/useProfile'
import { CubeHistoryResponse } from 'src/model/dashboard/dashboard'
import ApexAreaChart from 'src/views/dashboard/ApexAreaChart'
import TableServerSide from 'src/views/dashboard/TableServerSide'

import useSWR from "swr"

const Home = () => {
  useProfile()

  const [rows, setRows] = useState<CubeHistoryResponse[]>([])
  const [itemList, setItemList] = useState<string[]>([])
  const [item, setItem] = useState<string>('')
  const [cube, setCube] = useState<string>('')
  const [option1, setOption1] = useState<string>('')
  const [option2, setOption2] = useState<string>('')
  const [option3, setOption3] = useState<string>('')
  const [optionValue1, setOptionValue1] = useState<number>(0)
  const [optionValue2, setOptionValue2] = useState<number>(0)
  const [optionValue3, setOptionValue3] = useState<number>(0)

  const { data } = useSWR(
    { item, cube, option1, option2, option3, optionValue1, optionValue2, optionValue3 },
    () => GetItemDashboard({
      item, cube, option1, option2, option3, optionValue1, optionValue2, optionValue3
    }),
    {
      revalidateIfStale: false,
      revalidateOnFocus: true,
      revalidateOnReconnect: true
    }
  )

  useEffect(() => {
    if (typeof data !== 'undefined') {
      setRows(data.data.cubeHistories)
      setItemList(data.data.itemList)
    }
  }, [data])

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <TableServerSide
          rows={rows}
          itemList={itemList}
          item={item}
          setItem={(o: string) => setItem(o)}
          cube={cube}
          setCube={(o: string) => setCube(o)}
          option1={option1}
          setOption1={(o: string) => setOption1(o)}
          option2={option2}
          setOption2={(o: string) => setOption2(o)}
          option3={option3}
          setOption3={(o: string) => setOption3(o)}
          setOptionValue1={(o: number) => setOptionValue1(o)}
          setOptionValue2={(o: number) => setOptionValue2(o)}
          setOptionValue3={(o: number) => setOptionValue3(o)}
        />
      </Grid>
      <Grid item xs={12}>
        <ApexChartWrapper>
          <ApexAreaChart />
        </ApexChartWrapper>
      </Grid>
    </Grid>
  )
}

export default Home
