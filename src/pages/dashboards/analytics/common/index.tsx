// ** MUI Imports
import Grid from '@mui/material/Grid'
import { useTheme } from '@mui/material/styles'
import { ApexOptions } from 'apexcharts'
import { useEffect, useState } from 'react'
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'
import { GetCubeOverview, GetGradeUpDashboardLegendary, GetGradeUpDashboardUnique, GetWholeRecordDashboard } from 'src/common/api/msBackend/dashboard/dashboard'
import { useProfile } from 'src/hooks/useProfile'
import { CubeOverviewResponse } from 'src/model/dashboard/dashboard'
import ApexBarChart from 'src/views/dashboard/ApexBarChart'
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

    const now = new Date()
    const start = new Date(now)
    start.setMonth(now.getMonth() - 1)
    const end = new Date(now)
    end.setDate(now.getDate() - 1)

    const [startDate, setStartDate] = useState<Date>(start)
    const [endDate, setEndDate] = useState<Date>(end)
    const [options, setOptions] = useState<ApexOptions>(initialData)
    const [series, setSeries] = useState<SeryType[]>([])

    const swrOptions = {
        revalidateIfStale: false,
        revalidateOnFocus: true,
        revalidateOnReconnect: true
    }

    const url = '/dashboards/analytics/common'

    const { data: wholeData } = useSWR(
        { url, startDate, endDate },
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

            const red = res.filter((o) => o.cubeType === '레드 큐브').map((o) => o.count)
            const black = res.filter((o) => o.cubeType === '블랙 큐브').map((o) => o.count)
            const additional = res.filter((o) => o.cubeType === '에디셔널 큐브').map((o) => o.count)

            setSeries([
                { name: "레드 큐브", data: red },
                { name: "블랙 큐브", data: black },
                { name: "에디셔널 큐브", data: additional }
            ])
        }
    }, [wholeData])

    const [cubeOverview, setCubeOverview] = useState<CubeOverviewResponse>()

    const { data: cubeCounts } = useSWR(
        url + '/cubeOverview',
        GetCubeOverview,
        swrOptions
    )

    useEffect(() => {
        if (typeof cubeCounts !== 'undefined') {
            setCubeOverview(cubeCounts.data)
        }
    }, [cubeCounts])

    const [startDateForGradeUpL, setStartDateForGradeUpL] = useState<Date>(start)
    const [endDateForGradeUpL, setEndDateForGradeUpL] = useState<Date>(end)
    const [actualGradeDataL, setActualGradeDataL] = useState<number[]>([])
    const [expectedGradeDataL, setExpectedGradeDataL] = useState<number[]>([])

    const gradeUpUrlL = '/dashboards/analytics/common/gradeUp/l'
    const { data: gradeUpDataL } = useSWR(
        { gradeUpUrlL, startDateForGradeUpL, endDateForGradeUpL },
        () => GetGradeUpDashboardLegendary(
            {
                startDate: startDateForGradeUpL.toISOString().split("T")[0],
                endDate: endDateForGradeUpL.toISOString().split("T")[0]
            }
        ),
        swrOptions
    )

    useEffect(() => {
        if (typeof gradeUpDataL !== 'undefined') {
            const data = gradeUpDataL.data
            setActualGradeDataL([data.actualRed, data.actualBlack, data.actualAdditional])
            setExpectedGradeDataL([data.expectedRed, data.expectedBlack, data.expectedAdditional])

            console.log(actualGradeDataL)
        }
    }, [gradeUpDataL])

    const [startDateForGradeUpU, setStartDateForGradeUpU] = useState<Date>(start)
    const [endDateForGradeUpU, setEndDateForGradeUpU] = useState<Date>(end)
    const [actualGradeDataU, setActualGradeDataU] = useState<number[]>([])
    const [expectedGradeDataU, setExpectedGradeDataU] = useState<number[]>([])

    const gradeUpUrlU = '/dashboards/analytics/common/gradeUp/u'
    const { data: gradeUpDataU } = useSWR(
        { gradeUpUrlU, startDateForGradeUpU, endDateForGradeUpU },
        () => GetGradeUpDashboardUnique(
            {
                startDate: startDateForGradeUpU.toISOString().split("T")[0],
                endDate: endDateForGradeUpU.toISOString().split("T")[0]
            }
        ),
        swrOptions
    )

    useEffect(() => {
        if (typeof gradeUpDataU !== 'undefined') {
            const data = gradeUpDataU.data
            setActualGradeDataU([data.actualRed, data.actualBlack, data.actualAdditional])
            setExpectedGradeDataU([data.expectedRed, data.expectedBlack, data.expectedAdditional])
        }
    }, [gradeUpDataU])

    return (
        <Grid container spacing={6}>
            <Grid item xs={12}>
                {cubeOverview !== undefined ? <CubeCountCard
                    cc={cubeOverview.counts}
                    registeredApiKeyCount={cubeOverview.registeredApiKeyCount}
                /> : null}
            </Grid>
            <Grid item xs={6}>
                <ApexBarChart
                    title={'레전드리 등급업 확률'}
                    startDate={startDateForGradeUpL}
                    endDate={endDateForGradeUpL}
                    setStartDate={setStartDateForGradeUpL}
                    setEndDate={setEndDateForGradeUpL}
                    actualData={actualGradeDataL}
                    expectedData={expectedGradeDataL}
                />
            </Grid>
            <Grid item xs={6}>
                <ApexBarChart
                    title={'유니크 등급업 확률'}
                    startDate={startDateForGradeUpU}
                    endDate={endDateForGradeUpU}
                    setStartDate={setStartDateForGradeUpU}
                    setEndDate={setEndDateForGradeUpU}
                    actualData={actualGradeDataU}
                    expectedData={expectedGradeDataU}
                />
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
