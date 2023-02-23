// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { DeleteScheduleRequest, GetUserSchedule, PostUserSchedule, PostUserScheduleRequest, PutScheduleAccept, PutScheduleDelete, PutScheduleRefuse, PutUserSchedule, PutUserScheduleRequest, SearchOtherSchedule } from 'src/common/api/msBackend/user/schedule'

import { IScheduleResponse, ScheduleOfficial, SchedulePersonal } from 'src/model/user/schedule'
import { CalendarFiltersType, EventType } from "src/types/apps/calendarTypes";

// ** Types
import { CalendarStoreType } from 'src/types/apps/calendarTypes'
import { ThemeColor } from 'src/@core/layouts/types'

interface StateCalendar {
  calendar: CalendarStoreType
}

// ** Fetch Events
export const fetchEvents = createAsyncThunk<
  EventType[], undefined, { state: StateCalendar }
>('appCalendar/fetchEvents', async (undefined, { getState }) => {
  const { calendar } = getState();
  const response = await GetUserSchedule({
    userIds: calendar.memberIds ?? [],
    from: generateDateBegin(),
    to: generateDateEnd(),
  })

  const events = fromEventType(response.data, calendar.officialColor, calendar.myColor)

  return events.map((o: EventType) => {
    if (o.filterType !== undefined &&  !calendar.selectedCalendars.includes(o.filterType)) {
      return {...o, display: 'none'}
    } else return o
  })
})

export const fetchOtherEvents = createAsyncThunk<
  EventType[], string, { state: StateCalendar }
>('appCalendar/fetchOtherEvents', async (userId) => {
  const response = await SearchOtherSchedule({
    userId: userId,
    from: generateDateBegin(),
    to: generateDateEnd(),
  })

  return fromScheduleOther(response.data, userId)
})

export const removeOtherEvents = createAsyncThunk<
  string, string, { state: StateCalendar }
>('appCalendar/removeOtherEvents', (userId) => {
  return userId
})

export const displayEvents = createAsyncThunk<
  string, CalendarFiltersType, { state: StateCalendar }
>('appCalendar/displayEvents', (type) => {
  return type
})

export function fromEventType(res: IScheduleResponse, officialColor: ThemeColor, myColor: ThemeColor): EventType[] {
  const off = fromScheduleOfficial(res.officials, officialColor);
  const personal = fromSchedulePersonal(res.personals, myColor);

  return off.concat(personal);
}

export const acceptEvent = createAsyncThunk<
  string, number, { state: StateCalendar }
>('appCalendar/acceptEvent', async (scheduleId, { dispatch, getState }) => {
  const { calendar } = getState();
  if (!calendar.isSignIn) return "accept failed";

  const response = await PutScheduleAccept({
    scheduleId
  })
  await dispatch(fetchEvents())

  return response.data
})

export const refuseEvent = createAsyncThunk<
  string, number, { state: StateCalendar }
>('appCalendar/refuseEvent', async (scheduleId, { dispatch, getState }) => {
  const { calendar } = getState();
  if (!calendar.isSignIn) return "refuse failed";

  const response = await PutScheduleRefuse({
    scheduleId
  })
  await dispatch(fetchEvents())

  return response.data
})

function fromScheduleOfficial(
  scOff: ScheduleOfficial[],
  color: ThemeColor
): EventType[] {
  return scOff.map((e) => {
    return {
      id: e.scheduleId,
      title: e.title,
      allDay: e.allDay,
      start: new Date(e.start),
      end: e.end ? new Date(e.end) : undefined,
      color: primaryGradient(color),
      filterType: 'Official',
      extendedProps: {
        view: 'Official',
        byAdmin: e.byAdmin,
        description: e.note,
        guests: [],
        forOfficial: true,
        scheduleUpdateCode: undefined,
        note: e.note ?? ''
      }
    }
  })
}

function fromSchedulePersonal(
  scPer: SchedulePersonal[],
  color: ThemeColor,
): EventType[] {
  return scPer.map((e) => {
    return {
      id: e.scheduleId,
      title: e.title,
      allDay: e.allDay,
      start: new Date(e.start),
      end: e.end ? new Date(e.end) : undefined,
      color: primaryGradient(color),
      filterType: 'My',
      extendedProps: {
        owner: e.owner,
        view: e.isPublic == true ? 'Public' :
          (e.isPublic == false ? 'Private' : 'Public'),
        description: e.note,
        isPublic: e.isPublic,
        guests: e.members,
        forOfficial: false,
        note: e.note ?? ''
      }
    }
  })
}

function fromScheduleOther(
  scPer: SchedulePersonal[],
  bySearchUserId: string,
): EventType[] {
  return scPer.map((e) => {
    return {
      bySearchUserId: bySearchUserId,
      id: e.scheduleId,
      title: e.title,
      allDay: e.allDay,
      start: new Date(e.start),
      end: e.end ? new Date(e.end) : undefined,
      color: primaryGradient(""),
      extendedProps: {
        owner: e.owner,
        view: e.isPublic == true ? 'Public' :
          (e.isPublic == false ? 'Private' : 'Public'),
        description: e.note,
        isPublic: e.isPublic,
        guests: e.members,
        forOfficial: false,
        note: e.note ?? ''
      }
    }
  })
}

let fromDate: string | null = null;
function generateDateBegin(): string {
  if (fromDate) return fromDate;
  const today = new Date();
  const beginDate = new Date(today.getFullYear(), today.getMonth() - 1, 1);
  const month = (beginDate.getMonth() + 1).toString().padStart(2, "0");
  fromDate = beginDate.getFullYear().toString() + "-" + month + "-01"

  return fromDate;
}

let toDate: string | null = null;
function generateDateEnd() {
  if (toDate) return toDate;
  const today = new Date();
  const endDate = new Date(today.getFullYear(), today.getMonth() + 2, 0);
  const month = (endDate.getMonth() + 1).toString().padStart(2, "0");
  toDate = endDate.getFullYear() + "-" + month + "-" + endDate.getDate()

  return toDate;
}

// ** Add Event
export const addEvent = createAsyncThunk<
  string, PostUserScheduleRequest, { state: StateCalendar }
>('appCalendar/addEvent', async (req, { dispatch, getState }) => {
  const { calendar } = getState();

  if (!calendar.isSignIn) return "register failed";
  const response = await PostUserSchedule(req);
  await dispatch(fetchEvents())

  return response.data
})

// ** Update Event
export const updateEvent = createAsyncThunk<
  string, PutUserScheduleRequest, { state: StateCalendar }
>('appCalendar/updateEvent', async (req, { dispatch, getState }) => {
  const { calendar } = getState();

  if (!calendar.isSignIn) return "update failed";
  const response = await PutUserSchedule(req);

  await dispatch(fetchEvents())

  return response.data;
})

// ** Delete Event
export const deleteEvent = createAsyncThunk<
  string, DeleteScheduleRequest, { state: StateCalendar }
>('appCalendar/deleteEvent', async (req, { dispatch, getState }) => {
  const { calendar } = getState();
  if (!calendar.isSignIn) return "delete failed";

  const response = await PutScheduleDelete(req)
  await dispatch(fetchEvents())

  return response.data
})

export const appCalendarSlice = createSlice({
  name: 'appCalendar',
  initialState: {
    events: [],
    officialColor: 'primary',
    myColor: 'info',
    selectedEvent: null,
    selectedCalendars: ['My'],
    memberIds: [],
    selectedUsers: [],
    isSignIn: false,
    myId: ""
  } as CalendarStoreType,
  reducers: {
    handleProfile: (state, action) => {
      state.myId = action.payload;
    },
    handleIsSignIn: (state, action) => {
      state.isSignIn = action.payload;
    },
    handleSelectEvent: (state, action) => {
      state.selectedEvent = action.payload
    },
    handleSelectedUsers: (state, action) => {
      state.selectedUsers = action.payload
    },
    handleThemeSetting: (state, action) => {
      state.officialColor = action.payload[0]
      state.myColor = action.payload[1]
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchEvents.fulfilled, (state, action) => {
      state.events = action.payload;
    })
      .addCase(fetchOtherEvents.fulfilled, (state, action) => {
        state.events = state.events.concat(action.payload);
      })
      .addCase(removeOtherEvents.fulfilled, (state, action) => {
        state.events = state.events.filter((o) => o.bySearchUserId !== action.payload)
      })
      .addCase(displayEvents.fulfilled, (state, action) => {
        if (action.payload === 'Official' && state.selectedCalendars.includes('Official')) {
          // display none
          state.selectedCalendars = state.selectedCalendars.filter(o => o !== 'Official')
        } else if (action.payload === 'Official' && !state.selectedCalendars.includes('Official')) {
          // display auto
          state.selectedCalendars.push('Official')
        } else if (action.payload === 'My' && state.selectedCalendars.includes('My')) {
          // display none
          state.selectedCalendars = state.selectedCalendars.filter(o => o !== 'My')
        } else {
          // display auto
          state.selectedCalendars.push('My')
        }
        state.events = state.events.map((o) => {
          if (o.filterType === action.payload) {
            if (o.display === undefined || o.display === 'auto') {
              o.display = 'none'
            }
            else {
              o.display = 'auto'
            }

            return o
          }

          return o
        })
      })
      .addCase(addEvent.fulfilled, (state) => {
        state.selectedEvent = null
      })
      .addCase(deleteEvent.fulfilled, (state) => {
        state.selectedEvent = null
      })
  },
})

export const { handleSelectEvent, handleIsSignIn, handleSelectedUsers, handleThemeSetting } = appCalendarSlice.actions

export default appCalendarSlice.reducer

const primaryGradient = (color: string) => {
  if (color === 'primary') {
    return '#C6A7FE'
  } else if (color === 'secondary') {
    return '#9C9FA4'
  } else if (color === 'success') {
    return '#93DD5C'
  } else if (color === 'error') {
    return '#FF8C90'
  } else if (color === 'warning') {
    return '#FFCF5C'
  } else {
    return '#6ACDFF'
  }
}