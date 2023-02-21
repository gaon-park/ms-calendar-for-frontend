// ** MUI Imports
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Types
import { SidebarProfileSearchType } from 'src/types/apps/calendarTypes'
import { Fragment, useCallback, useEffect, useState } from 'react';
import { Autocomplete, Chip } from '@mui/material';
import { SimpleUserResponse } from 'src/model/user/user';

import useSWR from "swr"
import { SearchUserForScheduleInvite } from 'src/common/api/msBackend/search';

import { getInitials } from 'src/@core/utils/get-initials'
import { fetchOtherEvents, removeOtherEvents } from 'src/store/apps/calendar';

const SidebarProfileSearch = (props: SidebarProfileSearchType) => {
  const { dispatch, handleSelectedUsers } = props
  const [keyword, setKeyword] = useState('')
  const [open, setOpen] = useState<boolean>(false)
  const [options, setOptions] = useState<SimpleUserResponse[]>([])

  const limit = 5 // 同時閲覧できる最大ユーザ数
  const [selected, setSelected] = useState<string[]>([])
  const checkDisable = useCallback((option: SimpleUserResponse) => limit <= selected.length && !selected.includes(option.id), [limit, selected]);

  const handleChanged = async (newSelected: SimpleUserResponse[]) => {
    const ids = newSelected.map((o) => o.id)
    const addedId = ids.find((o) => !selected.includes(o))
    const removedId = selected.find((o) => !ids.includes(o))

    if (addedId !== undefined) {
      dispatch(fetchOtherEvents(addedId))
    }
    if (removedId !== undefined) {
      dispatch(removeOtherEvents(removedId))
    }
    setSelected(ids)
    dispatch(handleSelectedUsers(newSelected))
  }

  const { data } = useSWR(
    { keyword },
    () => SearchUserForScheduleInvite({
      keyword
    }),
    {
      revalidateIfStale: false,
      revalidateOnFocus: true,
      revalidateOnReconnect: true
    }
  )

  useEffect(() => {
    if (typeof data !== 'undefined') {
      setOptions(data.data)
    }
  }, [data])

  return (
    <Fragment>
      <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
        <Autocomplete
          sx={{
            width: 220
          }}
          multiple
          fullWidth
          getOptionDisabled={checkDisable}
          open={open}
          options={options}
          onChange={(e, newSelected) => handleChanged(newSelected)}
          onOpen={() => setOpen(true)}
          onClose={() => setOpen(false)}
          id='autocomplete-asynchronous-request'
          getOptionLabel={option => `${option.nickName}(@${option.nickName})`}
          isOptionEqualToValue={(option, value) => (option.accountId === value.accountId || option.nickName === value.nickName)}
          renderInput={params => (
            <TextField
              {...params}
              onChange={e => setKeyword(e.target.value)}
              label='Search User'
              InputProps={{
                ...params.InputProps,
              }}
            />
          )}
          renderTags={(value: SimpleUserResponse[], getTagProps) =>
            value.map((option: SimpleUserResponse, index: number) => (
              <Chip
                variant='outlined'
                label={option.accountId}
                {...(getTagProps({ index }) as {})}
                key={option.accountId}
                avatar={
                  option.avatarImg !== null ? <Avatar src={option.avatarImg} alt={option.accountId} />
                    : <CustomAvatar
                      skin='light'
                      color='primary'
                    >
                      {getInitials(option.nickName)}
                    </CustomAvatar>
                }
              />
            ))
          }
        />
      </Box>
    </Fragment>
  )
}

export default SidebarProfileSearch
