// ** React Import
import { useEffect, useRef } from 'react'

// ** Full Calendar & it's Plugins
import FullCalendar from '@fullcalendar/react'
import listPlugin from '@fullcalendar/list'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Types
import { CalendarType, EventType } from 'src/types/apps/calendarTypes'
import { generateDate } from 'src/@core/utils/calc-date'
import { convertDatetimeFormat } from 'src/@core/utils/format'
import { PutUserScheduleRequest } from 'src/common/api/msBackend/user/schedule'
import { IMember } from 'src/model/user/schedule'

const blankEvent: EventType = {
  id: 0,
  title: '',
  start: new Date(),
  end: generateDate({ minutes: 30 }),
  allDay: false,
  color: "#000000",
  extendedProps: {
    view: 'Public',
    byAdmin: undefined,
    repeatInfo: undefined,
    description: undefined,
    isPublic: undefined,
    guests: [],
    forOfficial: false,
    scheduleUpdateCode: 'ONLY_THIS',
    note: ''
  }
}

const Calendar = (props: CalendarType) => {
  // ** Props
  const {
    store,
    dispatch,
    direction,
    updateEvent,
    calendarApi,
    calendarsColor,
    setCalendarApi,
    handleSelectEvent,
    handleLeftSidebarToggle,
    handleAddEventSidebarToggle
  } = props

  // ** Refs
  const calendarRef = useRef()

  useEffect(() => {
    if (calendarApi === null) {
      // @ts-ignore
      setCalendarApi(calendarRef.current.getApi())
    }
  }, [calendarApi, setCalendarApi])

  if (store) {
    // ** calendarOptions(Props)
    const calendarOptions = {
      events: store.events.length ? store.events : [],
      plugins: [interactionPlugin, dayGridPlugin, timeGridPlugin, listPlugin],
      initialView: 'dayGridMonth',
      headerToolbar: {
        start: 'sidebarToggle, prev, next, title',
        end: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth'
      },
      views: {
        week: {
          titleFormat: { year: 'numeric', month: 'long', day: 'numeric' }
        }
      },
      eventTimeFormat: {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      },

      /*
      Enable dragging and resizing event
      ? Docs: https://fullcalendar.io/docs/editable
    */
      editable: true,

      /*
      Enable resizing event from start
      ? Docs: https://fullcalendar.io/docs/eventResizableFromStart
    */
      eventResizableFromStart: true,

      /*
      Automatically scroll the scroll-containers during event drag-and-drop and date selecting
      ? Docs: https://fullcalendar.io/docs/dragScroll
    */
      dragScroll: true,

      /*
      Max number of events within a given day
      ? Docs: https://fullcalendar.io/docs/dayMaxEvents
    */
      dayMaxEvents: 2,

      /*
      Determines if day names and week names are clickable
      ? Docs: https://fullcalendar.io/docs/navLinks
    */
      navLinks: true,

      eventClassNames({ event: calendarEvent }: any) {
        // @ts-ignore
        const colorName = calendarsColor[calendarEvent._def.extendedProps.calendar]

        return [
          // Background Color
          `bg-${colorName}`
        ]
      },

      eventClick({ event: clickedEvent }: any) {
        if (!store.isSignIn) return;
        dispatch(handleSelectEvent(clickedEvent))
        handleAddEventSidebarToggle()

        // * Only grab required field otherwise it goes in infinity loop
        // ! Always grab all fields rendered by form (even if it get `undefined`) otherwise due to Vue3/Composition API you might get: "object is not extensible"
        // event.value = grabEventDataFromEventApi(clickedEvent)

        // isAddNewEventSidebarActive.value = true
      },

      customButtons: {
        sidebarToggle: {
          text: <Icon icon='mdi:menu' />,
          click() {
            handleLeftSidebarToggle()
          }
        }
      },

      dateClick(info: any) {
        if (!store.isSignIn) return;
        const ev = { ...blankEvent }
        ev.start = info.date
        ev.end = generateDate({ manualDate: info.date, minutes: 30 })
        ev.allDay = true

        // @ts-ignore
        dispatch(handleSelectEvent(ev))
        handleAddEventSidebarToggle()
      },

      /*
      Handle event drop (Also include dragged event)
      ? Docs: https://fullcalendar.io/docs/eventDrop
      ? We can use `eventDragStop` but it doesn't return updated event so we have to use `eventDrop` which returns updated event
    */
      eventDrop({ event: droppedEvent }: any) {
        if (!store.isSignIn) return;
        const modififedEvent: PutUserScheduleRequest = {
          scheduleId: droppedEvent.id,
          title: droppedEvent.title,
          start: convertDatetimeFormat(droppedEvent.start),
          end: (droppedEvent.end !== null ? convertDatetimeFormat(droppedEvent.end) : undefined) ,
          allDay: droppedEvent.allDay,
          memberIds: droppedEvent.extendedProps.guests.map((o: IMember) => o.id),
          isPublic: droppedEvent.extendedProps.isPublic,
          scheduleUpdateCode: droppedEvent.extendedProps.scheduleUpdateCode ?? 'ONLY_THIS',
          forOfficial: droppedEvent.extendedProps.forOfficial,
          note: droppedEvent.extendedProps.description
        }
        dispatch(updateEvent(modififedEvent))
      },

      /*
      Handle event resize
      ? Docs: https://fullcalendar.io/docs/eventResize
    */
      eventResize({ event: resizedEvent }: any) {
        if (!store.isSignIn) return;
        const modififedEvent: PutUserScheduleRequest = {
          scheduleId: resizedEvent.id,
          title: resizedEvent.title,
          start: convertDatetimeFormat(resizedEvent.start),
          end: (resizedEvent.end !== null ? convertDatetimeFormat(resizedEvent.end) : undefined) ,
          allDay: resizedEvent.allDay,
          memberIds: resizedEvent.extendedProps.guests.map((o: IMember) => o.id),
          isPublic: resizedEvent.extendedProps.isPublic,
          scheduleUpdateCode: resizedEvent.extendedProps.scheduleUpdateCode ?? 'ONLY_THIS',
          forOfficial: resizedEvent.extendedProps.forOfficial,
          note: resizedEvent.extendedProps.description
        }
        dispatch(updateEvent(modififedEvent))
      },

      ref: calendarRef,

      // Get direction from app state (store)
      direction
    }

    // @ts-ignore
    return <FullCalendar {...calendarOptions} />
  } else {
    return null
  }
}

export default Calendar
