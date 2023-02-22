// ** MUI Imports
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'

interface TableHeaderProps {
  value: string
  setKeyword: (val: string) => void
}

const UserListTableHeader = (props: TableHeaderProps) => {
  // ** Props
  const { setKeyword, value } = props

  return (
    <Box sx={{ p: 5, pb: 3, display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
      <TextField
        inputProps={{ maxLength: 15 }}
        fullWidth
        value={value}
        placeholder='검색 키워드'
        onChange={e => setKeyword(e.target.value)}
      />
    </Box>
  )
}

export default UserListTableHeader
