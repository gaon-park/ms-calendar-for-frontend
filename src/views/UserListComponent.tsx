// ** React Imports
import { useState, MouseEvent } from 'react'

// ** Next Imports
import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import Menu from '@mui/material/Menu'
import { DataGrid } from '@mui/x-data-grid'
import { styled } from '@mui/material/styles'
import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'

// ** Types Imports

// ** data
import worldData from 'src/model/worldData'
import { FollowAccept, FollowCancel, FollowerDelete, FollowRequest } from 'src/common/api/msBackend/user/follow'
import { IProfile } from 'src/model/user/profile'
import { useRouter } from 'next/router'
import Avatar from 'src/@core/components/mui/avatar'

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

interface Props {
    users: IProfile[]
    forFollower: boolean
    updatedUser: (user: IProfile) => void
    isMyData?: boolean
}

const UserListComponent = (props: Props) => {
    const [pageSize, setPageSize] = useState<number>(10)

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

        const renderFollowActionItem = (user: IProfile) => {
            return (
                user.iamFollowHim === null ? (
                    <MenuItem key={`action_follow_${user.id}`} onClick={() => {
                        handleRowOptionsClose()
                        FollowRequest({ personalKey: user.id })
                        if (user.isPublic) {
                            user.iamFollowHim = 'FOLLOW'
                        } else {
                            user.iamFollowHim = 'WAITING'
                        }
                        props.updatedUser(user)
                    }} sx={{ '& svg': { mr: 2 } }}>
                        <Icon icon='mdi:account-plus-outline' fontSize={20} />
                        팔로우 하기
                    </MenuItem>
                ) : (
                    <MenuItem key={`action_cancel_${user.id}`} onClick={() => {
                        handleRowOptionsClose()
                        FollowCancel({ personalKey: user.id })
                        user.iamFollowHim = null
                        props.updatedUser(user)
                    }} sx={{ '& svg': { mr: 2 } }}>
                        <Icon icon='mdi:account-plus-outline' fontSize={20} />
                        팔로우 취소
                    </MenuItem>
                )
            )
        }

        const renderFollowerActionItem = (user: IProfile) => {
            return (
                user.heFollowMe !== null ? (
                    <Box>
                        {
                            user.heFollowMe === 'WAITING' ?
                                <MenuItem key={`action_follower_accept_${user.id}`} onClick={() => {
                                    handleRowOptionsClose()
                                    FollowAccept({ personalKey: user.id })
                                    user.heFollowMe = 'FOLLOW'
                                    props.updatedUser(user)
                                }} sx={{ '& svg': { mr: 2 } }}>
                                    <Icon icon='mdi:account-plus-outline' fontSize={20} />
                                    팔로우 요청 승인
                                </MenuItem> : null
                        }
                        <MenuItem key={`action_follower_delete_${user.id}`} onClick={() => {
                            handleRowOptionsClose()
                            FollowerDelete({ personalKey: user.id })
                            user.heFollowMe = null
                            props.updatedUser(user)
                        }} sx={{ '& svg': { mr: 2 } }}>
                            <Icon icon='mdi:account-minus-outline' fontSize={20} />
                            내 팔로워에서 삭제
                        </MenuItem>
                    </Box>
                ) : null
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
                    {renderFollowActionItem(row.row)}
                    {renderFollowerActionItem(row.row)}
                </Menu>
            </>
        )
    }

    const columns = [
        {
            flex: 0.15,
            minWidth: 200,
            field: 'user',
            headerName: '유저',
            sortable: false,
            filterable: false,
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
            headerName: '월드',
            sortable: false,
            filterable: false,
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
            headerName: '직업 분류',
            field: 'job',
            sortable: false,
            filterable: false,
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
            headerName: '세부 직업',
            field: 'jobDetail',
            sortable: false,
            filterable: false,
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
            field: 'followStatus',
            headerName: '팔로잉 체크',
            sortable: false,
            filterable: false,
            renderCell: ({ row }: CellType) => {
                return (
                    props.forFollower ? (
                        row.heFollowMe !== 'FOLLOW' ?
                            <CustomChip
                                skin='light'
                                size='small'
                                label={'응답 보류'}
                                color={'primary'}
                                sx={{ textTransform: 'capitalize' }}
                            />
                            : null
                    ) : (
                        row.iamFollowHim !== null ?
                            <CustomChip
                                skin='light'
                                size='small'
                                label={row.iamFollowHim === 'FOLLOW' ? '팔로우 하는중' : '상대 응답 대기'}
                                color={row.iamFollowHim === 'FOLLOW' ? 'success' : 'primary'}
                                sx={{ textTransform: 'capitalize' }}
                            />
                            : null
                    )
                )
            }
        },
        {
            flex: 0.05,
            minWidth: 50,
            sortable: false,
            filterable: false,
            field: 'actions',
            headerName: '유저 액션',
            renderCell: ({ row }: CellType) => <RowOptions row={row} />
        }
    ]

    return (
        <DataGrid
            columnVisibilityModel={
                {
                    actions: props.isMyData === true,
                    followStatus: props.isMyData === true
                }
            }
            autoHeight
            rows={props.users}
            rowCount={props.users.length}
            rowsPerPageOptions={[10, 20, 30]}
            columns={columns}
            pagination
            pageSize={pageSize}
            disableSelectionOnClick
            onPageSizeChange={(newPageSize: number) => setPageSize(newPageSize)}
        />
    )
}

export default UserListComponent
