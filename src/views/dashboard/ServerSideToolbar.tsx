// ** MUI Imports
import Box from '@mui/material/Box'
import { GridToolbarExport } from '@mui/x-data-grid'

const ServerSideToolbar = () => {

  return (
    <Box
      sx={{
        gap: 2,
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'left',
        p: theme => theme.spacing(2, 5, 4, 5)
      }}
    >
      <GridToolbarExport printOptions={{ disableToolbarButton: true }} />
    </Box>
  )
}

export default ServerSideToolbar
