// ** Types
import { Dispatch } from 'redux'

// ** Theme Type Import
import { ThemeColor } from 'src/@core/layouts/types'
import { DeleteScheduleRequest, PostUserScheduleRequest, PutUserScheduleRequest, RepeatCode, ScheduleUpdateCode } from 'src/common/api/msBackend/user/schedule'

export type CalendarFiltersType = 'Official' | 'My'
export type CalendarViewType = 'Official' | 'Public' | 'Private'

export type EventDateType = Date | null | undefined

export type CalendarColors = {
  Official: ThemeColor
  My: ThemeColor
}

export type EventType = {
  id: number
  title: string
  allDay: boolean
  start: Date
  end: Date | undefined
  color: string,
  extendedProps: {
    ownerId?: string,
    calendarMemberId?: string,
    view: CalendarViewType,
    byAdmin?: boolean,
    repeatInfo?: EventRepeatInfo,
    description?: string,
    isPublic?: boolean,
    guests?: string[],
    forOfficial: boolean,
    scheduleUpdateCode?: ScheduleUpdateCode;
  }
}

export interface EventRepeatInfo {
  repeatCode: string | RepeatCode;
  end: Date;
}

export type EventStateType = {
  url: string
  title: string
  allDay: boolean
  guests: string[]
  description: string
  endDate: Date | string
  startDate: Date | string
  calendar: CalendarFiltersType | string
}

export type CalendarStoreType = {
  events: EventType[]
  selectedEvent: null | EventType
  selectedCalendars: CalendarFiltersType[] | string[],
  memberIds: [],
  isSignIn: boolean,
  myId: string
}

export type CalendarType = {
  calendarApi: any
  dispatch: Dispatch<any>
  store: CalendarStoreType
  direction: 'ltr' | 'rtl'
  calendarsColor: CalendarColors
  setCalendarApi: (val: any) => void
  handleLeftSidebarToggle: () => void
  updateEvent: (event: PutUserScheduleRequest) => void
  handleAddEventSidebarToggle: () => void
  handleSelectEvent: (event: EventType) => void
}

export type SidebarLeftType = {
  mdAbove: boolean
  dispatch: Dispatch<any>
  leftSidebarWidth: number
  leftSidebarOpen: boolean
  store: CalendarStoreType
  calendarsColor: CalendarColors
  handleLeftSidebarToggle: () => void
  handleAddEventSidebarToggle: () => void
  handleSelectEvent: (event: null | EventType) => void
  handleCalendarsUpdate: (val: CalendarFiltersType) => void
}

export type SidebarProfileSearchType = {
  dispatch: Dispatch<any>
  store: CalendarStoreType
}

export type AddEventSidebarType = {
  calendarApi: any
  drawerWidth: number
  dispatch: Dispatch<any>
  store: CalendarStoreType
  addEventSidebarOpen: boolean
  deleteEvent: (req: DeleteScheduleRequest) => void
  addEvent: (req: PostUserScheduleRequest) => void
  updateEvent: (req: PutUserScheduleRequest) => void
  handleAddEventSidebarToggle: () => void
  handleSelectEvent: (event: null | EventType) => void
}
