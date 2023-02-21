// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { DeleteScheduleRequest, GetUserSchedule, PostUserSchedule, PostUserScheduleRequest, PutScheduleDelete, PutUserSchedule, PutUserScheduleRequest, SearchOtherSchedule } from 'src/common/api/msBackend/user/schedule'

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
  EventType[], ThemeColor[] | undefined, { state: StateCalendar }
>('appCalendar/fetchEvents', async (color, { getState }) => {
  const { calendar } = getState();
  const response = await GetUserSchedule({
    userIds: calendar.memberIds ?? [],
    from: generateDateBegin(),
    to: generateDateEnd(),
  })

  return fromEventType(response.data, color)
})

export const fetchOtherEvents = createAsyncThunk<
  EventType[], string, { state: StateCalendar }
>('appCalendar/fetchOtherEvents', async (userId) => {
  const response = await SearchOtherSchedule({
    userId: userId,
    from: generateDateBegin(),
    to: generateDateEnd(),
  })

  return fromSchedulePersonal(response.data, userId)
})

export const removeOtherEvents = createAsyncThunk<
  string, string, { state: CalendarStoreType }
>('appCalendar/removeOtherEvents', (userId) => {
  return userId
})

export const displayEvents = createAsyncThunk<
  string, CalendarFiltersType, { state: CalendarStoreType }
>('appCalendar/displayEvents', (type) => {
  return type
})

export function fromEventType(res: IScheduleResponse, color?: ThemeColor[]): EventType[] {
  const off = fromScheduleOfficial(res.officials, color?.[0]);
  const personal = fromSchedulePersonal(res.personals, undefined, color?.[1], 'My');

  return off.concat(personal);
}

function fromScheduleOfficial(scOff: ScheduleOfficial[], color?: ThemeColor): EventType[] {
  return scOff.map((e) => {
    return {
      id: e.scheduleId,
      title: e.title,
      allDay: e.allDay,
      start: new Date(e.start),
      end: e.end ? new Date(e.end) : undefined,
      color: primaryGradient(color ?? ""),
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
  bySearchUserId?: string,
  color?: ThemeColor,
  filterType?: CalendarFiltersType
): EventType[] {
  return scPer.map((e) => {
    return {
      bySearchUserId: bySearchUserId,
      id: e.scheduleId,
      title: e.title,
      allDay: e.allDay,
      start: new Date(e.start),
      end: e.end ? new Date(e.end) : undefined,
      color: primaryGradient(color ?? ""),
      filterType: filterType,
      extendedProps: {
        ownerId: e.ownerId,
        view: e.isPublic == true ? 'Public' :
          (e.isPublic == false ? 'Private' : 'Public'),
        description: e.note,
        isPublic: e.isPublic,
        guests: e.members.map((m) => {
          return m.accountId
        }),
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
  const beginDate = new Date(today.getFullYear(), today.getMonth(), 1);
  const month = (beginDate.getMonth() + 1).toString().padStart(2, "0");
  fromDate = beginDate.getFullYear().toString() + "-" + month + "-01"

  return fromDate;
}

let toDate: string | null = null;
function generateDateEnd() {
  if (toDate) return toDate;
  const today = new Date();
  const endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);
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
  if (calendar.isSignIn) return "delete failed";

  const response = await PutScheduleDelete(req)
  await dispatch(fetchEvents())

  return response.data
})

export const appCalendarSlice = createSlice({
  name: 'appCalendar',
  initialState: {
    events: [],
    selectedEvent: null,
    selectedCalendars: ['Official', 'My'],
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
        state.events = state.events.map((o) => {
          if (o.filterType === action.payload) {
            if (o.display === undefined || o.display === 'true') {
              state.selectedCalendars = state.selectedCalendars.filter((o) => o !== action.payload)
              o.display = 'none'
            }
            else {
              state.selectedCalendars.push(action.payload)
              o.display = 'true'
            }

            return o
          }

          return o
        })
      })
  },
})

export const { handleSelectEvent, handleIsSignIn, handleSelectedUsers } = appCalendarSlice.actions

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