// ** React Imports
import { useEffect, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import { Theme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

// ** Redux Imports
import { useDispatch, useSelector } from 'react-redux'

// ** Hooks
import { useSettings } from 'src/@core/hooks/useSettings'

// ** Types
import { RootState, AppDispatch } from 'src/store'
import { CalendarColors } from 'src/types/apps/calendarTypes'

// ** FullCalendar & App Components Imports
import Calendar from 'src/views/apps/calendar/Calendar'
import SidebarLeft from 'src/views/apps/calendar/SidebarLeft'
import CalendarWrapper from 'src/@core/styles/libs/fullcalendar'
import AddEventSidebar from 'src/views/apps/calendar/AddEventSidebar'

// ** Actions
import {
  addEvent,
  fetchEvents,
  deleteEvent,
  updateEvent,
  handleSelectEvent,
  handleIsSignIn,
  handleSelectedUsers
} from 'src/store/apps/calendar'
import { useAuth } from 'src/hooks/useAuth'
import { useProfile } from 'src/hooks/useProfile'
import { ThemeColor } from 'src/@core/layouts/types'

const colorValue: ThemeColor[] = ['primary', 'secondary', 'error', 'warning', 'info', 'success']

const AppCalendar = () => {
  // ** States
  const [calendarApi, setCalendarApi] = useState<null | any>(null)
  const [leftSidebarOpen, setLeftSidebarOpen] = useState<boolean>(false)
  const [addEventSidebarOpen, setAddEventSidebarOpen] = useState<boolean>(false)

  // ** Hooks
  const { settings } = useSettings()
  const dispatch = useDispatch<AppDispatch>()
  const store = useSelector((state: RootState) => state.calendar)
  const { profile } = useProfile()

  // ** Vars
  const leftSidebarWidth = 260
  const addEventSidebarWidth = 400
  const { skin, direction } = settings
  const mdAbove = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'))

  // ** CalendarColors
  const colors = colorValue.filter((o) => settings.themeColor !== o)
  const calendarsColor: CalendarColors = {
    Official: colors[2],
    My: settings.themeColor
  }

  const { isSignIn } = useAuth();

  useEffect(() => {
    dispatch(handleIsSignIn(isSignIn))
  }, [dispatch, store, isSignIn])

  useEffect(() => {
    // ちょっとわかんないとりあえず動きはする
    // @ts-ignore
    dispatch(fetchEvents([calendarsColor.Official, calendarsColor.My]))
  }, [dispatch, settings])

  const handleLeftSidebarToggle = () => setLeftSidebarOpen(!leftSidebarOpen)

  const handleAddEventSidebarToggle = () => setAddEventSidebarOpen(!addEventSidebarOpen)

  return (
    <CalendarWrapper
      className='app-calendar'
      sx={{
        boxShadow: skin === 'bordered' ? 0 : 6,
        ...(skin === 'bordered' && { border: theme => `1px solid ${theme.palette.divider}` })
      }}
    >
      {
        profile !== undefined ? <SidebarLeft
          store={store}
          mdAbove={mdAbove}
          dispatch={dispatch}
          calendarsColor={calendarsColor}
          leftSidebarOpen={leftSidebarOpen}
          leftSidebarWidth={leftSidebarWidth}
          handleSelectEvent={handleSelectEvent}
          handleLeftSidebarToggle={handleLeftSidebarToggle}
          handleAddEventSidebarToggle={handleAddEventSidebarToggle}
          handleSelectedUsers={handleSelectedUsers}
        /> : null
      }
      <Box
        sx={{
          p: 5,
          pb: 0,
          flexGrow: 1,
          borderRadius: 1,
          boxShadow: 'none',
          backgroundColor: 'background.paper',
          ...(mdAbove ? { borderTopLeftRadius: 0, borderBottomLeftRadius: 0 } : {})
        }}
      >
        <Calendar
          store={store}
          dispatch={dispatch}
          direction={direction}
          updateEvent={updateEvent}
          calendarApi={calendarApi}
          calendarsColor={calendarsColor}
          setCalendarApi={setCalendarApi}
          handleSelectEvent={handleSelectEvent}
          handleLeftSidebarToggle={handleLeftSidebarToggle}
          handleAddEventSidebarToggle={handleAddEventSidebarToggle}
        />
      </Box>
      {
        profile !== undefined ? <AddEventSidebar
          store={store}
          dispatch={dispatch}
          addEvent={addEvent}
          updateEvent={updateEvent}
          deleteEvent={deleteEvent}
          calendarApi={calendarApi}
          drawerWidth={addEventSidebarWidth}
          handleSelectEvent={handleSelectEvent}
          addEventSidebarOpen={addEventSidebarOpen}
          handleAddEventSidebarToggle={handleAddEventSidebarToggle}
          calendarsColor={calendarsColor}
        /> : null
      }
    </CalendarWrapper>
  )
}

export default AppCalendar
