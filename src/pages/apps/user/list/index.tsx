// ** React Imports
import { useState, useEffect, useCallback } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import MenuItem from '@mui/material/MenuItem'
import CardHeader from '@mui/material/CardHeader'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import CardContent from '@mui/material/CardContent'
import Select, { SelectChangeEvent } from '@mui/material/Select'

// ** Third Party Components
import useSWR from "swr"

// ** Custom Table Components Imports
import UserListTableHeader from 'src/views/UserListTableHeader'
import { SearchUser } from 'src/common/api/msBackend/search'

// ** data
import worldData from 'src/model/worldData'
import jobDetailData from 'src/model/jobDetailData'
import { IProfile } from 'src/model/user/profile'
import { useProfile } from 'src/hooks/useProfile'
import UserListComponent from 'src/views/UserListComponent'

const UserList = () => {
  // ** Hooks
  useProfile()

  // ** State
  const [world, setWorld] = useState<string>('')
  const [job, setJob] = useState<string>('')
  const [jobDetail, setJobDetail] = useState<string>('')
  const [keyword, setKeyword] = useState<string>('')

  // 검색
  const { data } = useSWR(
    { keyword, world, job, jobDetail },
    () => SearchUser({
      keyword,
      world,
      job,
      jobDetail
    }),
    {
      revalidateIfStale: false,
      revalidateOnFocus: true,
      revalidateOnReconnect: true
    }
  )

  const [users, setUsers] = useState<IProfile[]>()

  useEffect(() => {
    if (typeof data !== 'undefined') {
      setUsers(data.data)
    }
  }, [data])

  const handleWorldChange = useCallback((e: SelectChangeEvent) => {
    setWorld(e.target.value)
  }, [])

  const handleJobChange = useCallback((e: SelectChangeEvent) => {
    setJob(e.target.value)
  }, [])

  const handleJobDetailChange = useCallback((e: SelectChangeEvent) => {
    setJobDetail(e.target.value)
  }, [])

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='검색 필터' />
          <CardContent>
            <Grid container spacing={6}>
              <Grid item sm={4} xs={12}>
                <FormControl fullWidth>
                  <InputLabel id='world-select'>월드 필터</InputLabel>
                  <Select
                    fullWidth
                    value={world}
                    id='select-world'
                    label='Select World'
                    labelId='world-select'
                    onChange={handleWorldChange}
                    inputProps={{ placeholder: '월드 필터' }}
                  >
                    <MenuItem key={`world_`} value=''>월드 필터</MenuItem>
                    {
                      worldData.map((data, index) => (
                        <MenuItem key={`world_${index}`} value={data.value}>{data.value}</MenuItem>
                      ))
                    }
                  </Select>
                </FormControl>
              </Grid>
              <Grid item sm={4} xs={12}>
                <FormControl fullWidth>
                  <InputLabel id='status-job'>직업 분류 필터</InputLabel>
                  <Select
                    fullWidth
                    value={job}
                    id='select-job'
                    label='Select Job'
                    labelId='job-select'
                    onChange={handleJobChange}
                    inputProps={{ placeholder: '직업 분류 필터' }}
                  >
                    <MenuItem key={`job_`} value=''>직업 분류 필터</MenuItem>
                    {
                      jobDetailData.map((data, index) => (
                        <MenuItem key={`job_${index}`} value={data.category}>{data.category}</MenuItem>
                      ))
                    }
                  </Select>
                </FormControl>
              </Grid>
              <Grid item sm={4} xs={12}>
                <FormControl fullWidth>
                  <InputLabel id='jobDetail-select'>세부 직업 필터</InputLabel>
                  <Select
                    fullWidth
                    value={jobDetail}
                    id='select-jobDetail'
                    label='Select JobDetail'
                    labelId='jobDetail-select'
                    onChange={handleJobDetailChange}
                    inputProps={{ placeholder: '세부 직업 필터' }}
                  >
                    <MenuItem key={`jobDetail_`} value=''>세부 직업 필터</MenuItem>
                    {
                      (job === ''
                        ? jobDetailData
                        : jobDetailData.filter((data) => (data.category === job)))
                        .map((data) => (

                          data.sub.map((sub, index) => (
                            <MenuItem key={`jobDetail_${index}`} value={sub}>{sub}</MenuItem>
                          ))
                        ))
                    }
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </CardContent>
          <UserListTableHeader value={keyword ?? ''} setKeyword={setKeyword} />
          <UserListComponent
            users={users ?? []}
            forFollower={false}
            updatedUser={(user: IProfile) => {
              setUsers(users?.map((obj) => {
                if (obj.id === user.id) return user

                return obj
              }))
            }}
          />
        </Card>
      </Grid>
    </Grid>
  )
}

export default UserList
