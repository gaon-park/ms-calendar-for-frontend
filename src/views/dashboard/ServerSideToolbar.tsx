// ** React Imports
import { ChangeEvent, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import { GridToolbarExport } from '@mui/x-data-grid'

// ** Icon Imports
import Autocomplete from '@mui/material/Autocomplete/Autocomplete'

interface Props {
  value: string
  clearSearch: () => void
  onChange: (e: ChangeEvent) => void
}

const ServerSideToolbar = (props: Props) => {
  const [item, setItem] = useState<string>('')

  return (
    <Box
      sx={{
        gap: 2,
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        p: theme => theme.spacing(2, 5, 4, 5)
      }}
    >
      <GridToolbarExport printOptions={{ disableToolbarButton: true }} />
      <Autocomplete
          sx={{
            width: 500
          }}
          multiple
          fullWidth
          // getOptionDisabled={checkDisable}
          open={false}
          options={[]}
          // onChange={(e, newSelected) => handleChanged(newSelected)}
          // onOpen={() => setOpen(true)}
          // onClose={() => setOpen(false)}
          id='autocomplete-asynchronous-request'
          // getOptionLabel={option => `${option.nickName}(@${option.nickName})`}
          // isOptionEqualToValue={(option, value) => (option.accountId === value.accountId || option.nickName === value.nickName)}
          renderInput={params => (
            <TextField
              {...params}
              onChange={e => setItem(e.target.value)}
              label='아이템 필터링'
              InputProps={{
                ...params.InputProps,
              }}
            />
          )}
          // renderTags={(value: SimpleUserResponse[], getTagProps) =>
          //   value.map((option: SimpleUserResponse, index: number) => (
          //     <Chip
          //       variant='outlined'
          //       label={option.accountId}
          //       {...(getTagProps({ index }) as {})}
          //       key={option.accountId}
          //       avatar={
          //         option.avatarImg !== null ? <Avatar src={option.avatarImg} alt={option.accountId} />
          //           : <CustomAvatar
          //             skin='light'
          //             color='primary'
          //           >
          //             {getInitials(option.nickName)}
          //           </CustomAvatar>
          //       }
          //     />
          //   ))
          // }
        />
    </Box>
  )
}

export default ServerSideToolbar
