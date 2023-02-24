// ** MUI Imports
import Grid from '@mui/material/Grid'
import { useTheme } from '@mui/material/styles'
import { ApexOptions } from 'apexcharts'
import { useEffect, useState } from 'react'
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'
import { GetCubeOverview, GetWholeRecordDashboard } from 'src/common/api/msBackend/dashboard/dashboard'
import { useProfile } from 'src/hooks/useProfile'
import { CubeOverviewResponse } from 'src/model/dashboard/dashboard'
import ApexLineChart from 'src/views/dashboard/ApexLineChart'
import CubeCountCard from 'src/views/dashboard/CubeCountCard'
import { SeryType } from 'src/views/pages/user-profile/profile/AboutOverivew'

import useSWR from "swr"

const areaColors = {
    red: '#FF8C90',
    black: '#9C9FA4',
    additional: '#93DD5C'
}

const RecordDashboardCommon = () => {
    useProfile()

    // ** Hook
    const theme = useTheme()

    const initialData: ApexOptions = {
        chart: {
            height: 350,
            type: 'line',
            zoom: {
                enabled: false
            },
        },
        dataLabels: {
            enabled: false
        },
        legend: {
            position: 'top',
            horizontalAlign: 'left',
            labels: { colors: theme.palette.text.secondary },
            markers: {
                offsetY: 1,
                offsetX: -3
            },
            itemMargin: {
                vertical: 3,
                horizontal: 10
            }
        },
        markers: {
            size: 0,
            hover: {
                sizeOffset: 6
            }
        },
        colors: [areaColors.red, areaColors.black, areaColors.additional],
        xaxis: {
            axisBorder: { show: false },
            axisTicks: { color: theme.palette.divider },
            crosshairs: {
                stroke: { color: theme.palette.divider }
            },
            labels: {
                style: { colors: theme.palette.text.disabled }
            },
            categories: []
        }
    }

    const [startDate, setStartDate] = useState<Date>(new Date('2022-11-25'))
    const [endDate, setEndDate] = useState<Date>(new Date())
    const [options, setOptions] = useState<ApexOptions>(initialData)
    const [series, setSeries] = useState<SeryType[]>([])

    const swrOptions = {
        revalidateIfStale: false,
        revalidateOnFocus: true,
        revalidateOnReconnect: true
    }

    const { data: wholeData } = useSWR(
        { startDate, endDate },
        () => GetWholeRecordDashboard({
            startDate: startDate.toISOString().split("T")[0],
            endDate: endDate.toISOString().split("T")[0]
        }),
        swrOptions
    )

    useEffect(() => {
        if (typeof wholeData !== 'undefined') {
            const categories = wholeData.data.categories
            setOptions({
                ...initialData, xaxis: {
                    ...initialData.xaxis, categories: categories
                }
            })

            const res = wholeData.data.data

            const red = res.filter((o) => o.cubeType === 'RED').map((o) => o.count)
            const black = res.filter((o) => o.cubeType === 'BLACK').map((o) => o.count)
            const additional = res.filter((o) => o.cubeType === 'ADDITIONAL').map((o) => o.count)

            setSeries([
                { name: "레드 큐브", data: red },
                { name: "블랙 큐브", data: black },
                { name: "에디셔널 큐브", data: additional }
            ])
        }
    }, [wholeData])

    const [cubeOverview, setCubeOverview] = useState<CubeOverviewResponse>()

    const { data: cubeCounts } = useSWR(
        'dashboards/record/common/cubeOverview',
        GetCubeOverview,
        swrOptions
    )

    useEffect(() => {
        if (typeof cubeCounts !== 'undefined') {
            setCubeOverview(cubeCounts.data)
        }
    }, [cubeCounts])  

    return (
        <Grid container spacing={6}>
            <Grid item xs={12}>
                {cubeOverview !== undefined ? <CubeCountCard
                    cc={cubeOverview.counts}
                    registeredApiKeyCount={cubeOverview.registeredApiKeyCount}
                /> : null}
            </Grid>
            <Grid item xs={12}>
                <ApexChartWrapper>
                    <ApexLineChart
                        startDate={startDate}
                        endDate={endDate}
                        setStartDate={(o) => setStartDate(o)}
                        setEndDate={(o) => setEndDate(o)}
                        options={options}
                        series={series}
                    />
                </ApexChartWrapper>
            </Grid>
        </Grid>
    )
}

export default RecordDashboardCommon
