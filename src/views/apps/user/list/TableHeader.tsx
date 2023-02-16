// ** MUI Imports
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'

interface TableHeaderProps {
  value: string
  toggle: () => void
  setKeyword: (val: string) => void
}

const TableHeader = (props: TableHeaderProps) => {
  // ** Props
  const { setKeyword, value } = props

  return (
    <Box sx={{ p: 5, pb: 3, display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
      <TextField
        inputProps={{ maxLength: 15 }}
        fullWidth
        value={value}
        placeholder='Search User By Keyword'
        onChange={e => setKeyword(e.target.value)}
      />
    </Box>
  )
}

export default TableHeader
