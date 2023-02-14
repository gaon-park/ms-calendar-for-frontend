import { Grid, Card, Box, Typography, CardHeader, MenuItem, Avatar, IconButton, Menu } from "@mui/material"
import { DataGrid } from "@mui/x-data-grid"
import { useRouter } from "next/router"
import { MouseEvent, useState } from "react"
import { getInitials } from "src/@core/utils/get-initials"
import { FollowRequest, FollowCancel, FollowerDelete } from "src/common/api/msBackend/user/follow"
import worldData from "src/model/worldData"
import CustomAvatar from 'src/@core/components/mui/avatar'
import CustomChip from 'src/@core/components/mui/chip'
import Icon from 'src/@core/components/icon'
import Link from 'next/link'
import { styled } from '@mui/material/styles'
import { IProfile } from "src/model/user/profile"

interface Props {
    followers: IProfile[]
}

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

const Follow = (props: Props) => {
    // ** Hooks
    const { followers } = props

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
    const [pageSize, setPageSize] = useState<number>(10)

    const [reqId, setReqId] = useState<number>(0)

    const router = useRouter()

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
                            <StyledLink href={`/user-profile/profile/?accountId=${row.accountId}`}>{row.nickName}</StyledLink>
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
            field: 'follower request',
            headerName: 'Follow Request',
            renderCell: ({ row }: CellType) => {
                return (
                    row.ifollowHim === 'FOLLOW' ?
                        <CustomChip
                            skin='light'
                            size='small'
                            label={'팔로우 하는중'}
                            color={'success'}
                            sx={{ textTransform: 'capitalize' }}
                        /> :
                        <CustomChip
                            skin='light'
                            size='small'
                            label={'상대 응답 대기'}
                            color={'primary'}
                            sx={{ textTransform: 'capitalize' }}
                        />
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
    return followers !== undefined ? (
        <Grid container spacing={6}>
            <Grid item xs={12}>
                <Card>
                    <CardHeader title='Followers' />
                    <DataGrid
                        autoHeight
                        rows={followers}
                        rowCount={followers.length}
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
    ) : null
}

export default Follow