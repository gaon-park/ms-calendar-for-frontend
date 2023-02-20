// ** MUI Imports
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Types
import { SidebarProfileSearchType } from 'src/types/apps/calendarTypes'
import { useEffect, useState } from 'react';
import { Autocomplete, Chip, CircularProgress } from '@mui/material';
import { SimpleUserResponse } from 'src/model/user/user';

import useSWR from "swr"
import { SearchUserForScheduleInvite } from 'src/common/api/msBackend/search';

import { getInitials } from 'src/@core/utils/get-initials'

const SidebarProfileSearch = (props: SidebarProfileSearchType) => {
  const [keyword, setKeyword] = useState('')
  const [open, setOpen] = useState<boolean>(false)
  const [options, setOptions] = useState<SimpleUserResponse[]>([])
  const loading = open && options.length === 0

  const limit = 4 // 同時閲覧できる最大ユーザ数
  const [selected, setSelected] = useState<SimpleUserResponse[]>([])
  const checkDisable = React.useCallback((option: SimpleUserResponse) => limit <= selected.length && !selected.includes(option), [limit, selected]);

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
    <React.Fragment>
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
          loading={loading}
          onChange={(e, newSelected) => setSelected(newSelected)}
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
                endAdornment: (
                  <React.Fragment>
                    {loading ? <CircularProgress color='inherit' size={20} /> : null}
                    {params.InputProps.endAdornment}
                  </React.Fragment>
                )
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
    </React.Fragment>
  )
}

export default SidebarProfileSearch
