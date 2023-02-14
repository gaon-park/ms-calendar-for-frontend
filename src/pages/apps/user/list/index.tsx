// ** React Imports
import { useState, useEffect, MouseEvent, useCallback } from 'react'

// ** Next Imports
import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Menu from '@mui/material/Menu'
import Grid from '@mui/material/Grid'
import { DataGrid } from '@mui/x-data-grid'
import { styled } from '@mui/material/styles'
import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import CardContent from '@mui/material/CardContent'
import Select, { SelectChangeEvent } from '@mui/material/Select'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'

// ** Third Party Components
import useSWR from "swr"

// ** Types Imports
import { Avatar } from '@mui/material'

// ** Custom Table Components Imports
import TableHeader from 'src/views/apps/user/list/TableHeader'
import { SearchUser } from 'src/common/api/msBackend/search'

// ** data
import worldData from 'src/model/worldData'
import jobDetailData from 'src/model/jobDetailData'
import { FollowCancel, FollowerDelete, FollowRequest } from 'src/common/api/msBackend/user/follow'
import { IProfile } from 'src/model/user/profile'
import { useProfile } from 'src/hooks/useProfile'
import { useRouter } from 'next/router'

const worldIcon = (world: string) => {
  for (let i = 0; i < worldData.length; i++) {
    if (worldData[i].value === world) {
      return worldData[i].iconSrc
    }
  }
  return ''
}

interface CellType {
  row: IProfile
}

const StyledLink = styled(Link)(({ theme }) => ({
  fontWeight: 600,
  fontSize: '1rem',
  cursor: 'pointer',
  textDecoration: 'none',
  color: theme.palette.text.secondary,
  '&:hover': {
    color: theme.palette.primary.main
  }
}))

const UserList = () => {
  // ** Hooks
  useProfile()

  // ** renders client column
  const renderClient = (row: IProfile) => {
    if (row.avatarImg !== '' && row.avatarImg !== null) {
      return <CustomAvatar src={row.avatarImg} sx={{ mr: 3, width: 30, height: 30 }} />
    } else {
      return (
        <CustomAvatar
          skin='light'
          color='primary'
          sx={{ mr: 3, width: 30, height: 30, fontSize: '.875rem' }}
        >
          {getInitials(row.nickName)}
        </CustomAvatar>
      )
    }
  }

  // ** State
  const [world, setWorld] = useState<string>('')
  const [job, setJob] = useState<string>('')
  const [jobDetail, setJobDetail] = useState<string>('')
  const [keyword, setKeyword] = useState<string>('')

  const [pageSize, setPageSize] = useState<number>(10)
  const [addUserOpen, setAddUserOpen] = useState<boolean>(false)

  const [reqId, setReqId] = useState<number>(0)

  const router = useRouter()

  // 검색
  const { data } = useSWR(
    { keyword, world, job, jobDetail, reqId },
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

  const [users, setUsers] = useState<IProfile[]>([])
  const [fullHit, setFullHit] = useState<number>(0)

  useEffect(() => {
    if (typeof data === 'undefined') return
    setUsers(data.data.users)
    setFullHit(data.data.fullHit)
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

  const toggleAddUserDrawer = () => setAddUserOpen(!addUserOpen)

  const RowOptions = (row: CellType) => {
    // ** State
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

    const rowOptionsOpen = Boolean(anchorEl)

    const handleRowOptionsClick = (event: MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget)
    }
    const handleRowOptionsClose = () => {
      setAnchorEl(null)
    }

    const request = (
      user: IProfile,
      apiFunction: Function,
    ) => {
      handleRowOptionsClose()
      const apiRequest = async () => {
        await apiFunction({
          personalKey: user.id
        })
      }
      apiRequest()
      setReqId(reqId + 1)
    }

    interface ActionRequest {
      text: string
      icon: string
      apiRequest: Function
    }

    const renderActionItemValue = (user: IProfile): ActionRequest[] => {
      let res: ActionRequest[] = []
      if (user.ifollowHim === null) {
        res.push({ text: '팔로우 하기', icon: 'mdi:account-plus-outline', apiRequest: FollowRequest })
      }
      else {
        res.push({ text: '팔로우 취소', icon: 'mdi:account-plus-outline', apiRequest: FollowCancel })
      }
      if (user.heFollowMe !== null) {
        res.push({ text: '내 팔로워에서 삭제', icon: 'mdi:account-plus-outline', apiRequest: FollowerDelete })
      }
      return res
    }

    const renderRequestItem = (user: IProfile) => {
      const values = renderActionItemValue(user)
      return (
        values.map((value, index) => (
          <MenuItem key={`action_${user.id}_${index}`} onClick={() => request(
            user, value.apiRequest
          )} sx={{ '& svg': { mr: 2 } }}>
            <Icon icon={value.icon} fontSize={20} />
            {value.text}
          </MenuItem>
        ))
      )
    }

    return (
      <>
        <IconButton size='small' onClick={handleRowOptionsClick}>
          <Icon icon='mdi:dots-vertical' />
        </IconButton>
        <Menu
          keepMounted
          anchorEl={anchorEl}
          open={rowOptionsOpen}
          onClose={handleRowOptionsClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
          PaperProps={{ style: { minWidth: '8rem' } }}
        >
          <MenuItem
            key={`${row.row.id}_0`}
            sx={{ '& svg': { mr: 2 } }}
            onClick={() => {
              router.push(
                `/user-profile/profile/?accountId=${row.row.accountId}`,
              )
            }}
          >
            <Icon icon='mdi:eye-outline' fontSize={20} />
            프로필 보기
          </MenuItem>
          {renderRequestItem(row.row)}
        </Menu>
      </>
    )
  }

  const columns = [
    {
      flex: 0.15,
      minWidth: 200,
      field: 'user',
      headerName: 'User',
      renderCell: ({ row }: CellType) => {
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {renderClient(row)}
            <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
              <StyledLink href='/apps/user/view/overview/'>{row.nickName}</StyledLink>
              <Typography noWrap variant='caption'>
                {`@${row.accountId}`}
              </Typography>
            </Box>
          </Box>
        )
      }
    },
    {
      flex: 0.1,
      field: 'world',
      minWidth: 60,
      headerName: 'World',
      renderCell: ({ row }: CellType) => {
        if (row.world !== '') {
          return (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Avatar alt='worldIcon' sx={{ width: 18, height: 18 }} src={worldIcon(row.world)} />
              <Typography noWrap sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
                {row.world}
              </Typography>
            </Box>
          )
        }
      }
    },
    {
      flex: 0.1,
      minWidth: 60,
      headerName: 'Job',
      field: 'job',
      renderCell: ({ row }: CellType) => {
        if (row.job !== '') {
          return (
            <Typography noWrap sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
              {row.job}
            </Typography>
          )
        }
      }
    },
    {
      flex: 0.1,
      minWidth: 110,
      headerName: 'Job Detail',
      field: 'jobDetail',
      renderCell: ({ row }: CellType) => {
        if (row.jobDetail !== '') {
          return (
            <Typography noWrap sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
              {row.jobDetail}
            </Typography>
          )
        }
      }
    },
    {
      flex: 0.08,
      minWidth: 80,
      field: 'follow',
      headerName: 'Follow',
      renderCell: ({ row }: CellType) => {
        return (
          row.ifollowHim === 'FOLLOW' || row.ifollowHim === 'WAITING' ?
            <CustomChip
              skin='light'
              size='small'
              label={row.ifollowHim}
              color={row.ifollowHim === 'FOLLOW' ? 'success' : 'primary'}
              sx={{ textTransform: 'capitalize' }}
            /> : null
        )
      }
    },
    {
      flex: 0.05,
      minWidth: 50,
      sortable: false,
      field: 'actions',
      headerName: 'Actions',
      renderCell: ({ row }: CellType) => <RowOptions row={row} />
    }
  ]

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Search Filters' />
          <CardContent>
            <Grid container spacing={6}>
              <Grid item sm={4} xs={12}>
                <FormControl fullWidth>
                  <InputLabel id='world-select'>Select World</InputLabel>
                  <Select
                    fullWidth
                    value={world}
                    id='select-world'
                    label='Select World'
                    labelId='world-select'
                    onChange={handleWorldChange}
                    inputProps={{ placeholder: 'Select World' }}
                  >
                    <MenuItem key={`world_`} value=''>Select World</MenuItem>
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
                  <InputLabel id='status-job'>Select Job</InputLabel>
                  <Select
                    fullWidth
                    value={job}
                    id='select-job'
                    label='Select Job'
                    labelId='job-select'
                    onChange={handleJobChange}
                    inputProps={{ placeholder: 'Select Job' }}
                  >
                    <MenuItem key={`job_`} value=''>Select Job</MenuItem>
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
                  <InputLabel id='jobDetail-select'>Select JobDetail</InputLabel>
                  <Select
                    fullWidth
                    value={jobDetail}
                    id='select-jobDetail'
                    label='Select JobDetail'
                    labelId='jobDetail-select'
                    onChange={handleJobDetailChange}
                    inputProps={{ placeholder: 'Select JobDetail' }}
                  >
                    <MenuItem key={`jobDetail_`} value=''>Select JobDetail</MenuItem>
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
          <TableHeader value={keyword ?? ''} setKeyword={setKeyword} toggle={toggleAddUserDrawer} />
          <DataGrid
            autoHeight
            rows={users}
            rowCount={fullHit}
            rowsPerPageOptions={[10, 20, 30]}
            columns={columns}
            pagination
            pageSize={pageSize}
            disableSelectionOnClick
            onPageSizeChange={(newPageSize: number) => setPageSize(newPageSize)}
          />
        </Card>
      </Grid>
    </Grid>
  )
}

export default UserList
