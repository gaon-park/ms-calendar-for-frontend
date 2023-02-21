// ** MUI Imports
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import Checkbox from '@mui/material/Checkbox'
import Typography from '@mui/material/Typography'
import FormControlLabel from '@mui/material/FormControlLabel'

// ** Types
import { ThemeColor } from 'src/@core/layouts/types'
import { SidebarLeftType, CalendarFiltersType } from 'src/types/apps/calendarTypes'
import { useAuth } from 'src/hooks/useAuth'
import SidebarProfileSearch from './SidebarProfileSearch'
import { displayEvents } from 'src/store/apps/calendar'

const SidebarLeft = (props: SidebarLeftType) => {
  const { isSignIn } = useAuth();
  const {
    store,
    mdAbove,
    dispatch,
    calendarsColor,
    leftSidebarOpen,
    leftSidebarWidth,
    handleSelectEvent,
    handleLeftSidebarToggle,
    handleAddEventSidebarToggle,
    handleSelectedUsers
  } = props

  const colorsArr = calendarsColor ? Object.entries(calendarsColor) : []

  const renderFilters = colorsArr.length
    ? colorsArr.map(([key, value]: string[]) => {
        return (
          <FormControlLabel
            key={key}
            label={key}
            control={
              <Checkbox
                color={value as ThemeColor}
                checked={store.selectedCalendars.includes(key as CalendarFiltersType)}
                onChange={() => dispatch(displayEvents(key as CalendarFiltersType))}
              />
            }
          />
        )
      })
    : null

  const handleSidebarToggleSidebar = () => {
    handleAddEventSidebarToggle()
    dispatch(handleSelectEvent(null))
  }

  if (renderFilters) {
    return (
      <Drawer
        open={leftSidebarOpen}
        onClose={handleLeftSidebarToggle}
        variant={mdAbove ? 'permanent' : 'temporary'}
        ModalProps={{
          disablePortal: true,
          disableAutoFocus: true,
          disableScrollLock: true,
          keepMounted: true // Better open performance on mobile.
        }}
        sx={{
          zIndex: 2,
          display: 'block',
          position: mdAbove ? 'static' : 'absolute',
          '& .MuiDrawer-paper': {
            borderRadius: 1,
            boxShadow: 'none',
            width: leftSidebarWidth,
            borderTopRightRadius: 0,
            alignItems: 'flex-start',
            borderBottomRightRadius: 0,
            p: theme => theme.spacing(5),
            zIndex: mdAbove ? 2 : 'drawer',
            position: mdAbove ? 'static' : 'absolute'
          },
          '& .MuiBackdrop-root': {
            borderRadius: 1,
            position: 'absolute'
          }
        }}
      >
        {isSignIn ?
          <Button fullWidth variant='contained' onClick={handleSidebarToggleSidebar}>
            Add Event
          </Button>
        : null}

        <Typography variant='caption' sx={{ mt: 7, mb: 2, textTransform: 'uppercase' }}>
          Calendars
        </Typography>
        {renderFilters}
        <Divider />
        <SidebarProfileSearch
          store={store}
          dispatch={dispatch}
          handleSelectedUsers={handleSelectedUsers}
        />
      </Drawer>
    )
  } else {
    return null
  }
}

export default SidebarLeft
