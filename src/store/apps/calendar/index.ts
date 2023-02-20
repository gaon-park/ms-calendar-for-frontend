// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { DeleteScheduleRequest, GetUserSchedule, PostUserSchedule, PostUserScheduleRequest, PutScheduleDelete, PutUserSchedule, PutUserScheduleRequest, SearchOtherSchedule } from 'src/common/api/msBackend/user/schedule'

import { IScheduleResponse, ScheduleOfficial, SchedulePersonal } from 'src/model/user/schedule'
import { EventType } from "src/types/apps/calendarTypes";

// ** Types
import { CalendarStoreType } from 'src/types/apps/calendarTypes'

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

  return fromEventType(response.data)
})

export const fetchOtherEvent = createAsyncThunk<
  EventType[], string, { state: StateCalendar }
>('appCalendar/fetchOtherEvent', async (userId, { getState }) => {
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

export function fromEventType(res: IScheduleResponse): EventType[] {
  const off = fromScheduleOfficial(res.officials);
  const personal = fromSchedulePersonal(res.personals);

  return off.concat(personal);
}

function fromScheduleOfficial(scOff: ScheduleOfficial[]): EventType[] {
  return scOff.map((e) => {
    return {
      id: e.scheduleId,
      title: e.title,
      allDay: e.allDay,
      start: new Date(e.start),
      end: e.end ? new Date(e.end) : undefined,
      color: "#000000",
      extendedProps: {
        view: 'Official',
        byAdmin: e.byAdmin,
        description: e.note,
        guests: [],
        forOfficial: true,
        scheduleUpdateCode: undefined
      }
    }
  })
}

function fromSchedulePersonal(
  scPer: SchedulePersonal[],
  bySearchUserId?: string
): EventType[] {
  return scPer.map((e) => {
    return {
      bySearchUserId: bySearchUserId,
      id: e.scheduleId,
      title: e.title,
      allDay: e.allDay,
      start: new Date(e.start),
      end: e.end ? new Date(e.end) : undefined,
      color: "primary",
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

  if (calendar.isSignIn) return "register failed";
  const response = await PostUserSchedule(req);
  await dispatch(fetchEvents())

  return response.data
})

// ** Update Event
export const updateEvent = createAsyncThunk<
  string, PutUserScheduleRequest, { state: StateCalendar }
>('appCalendar/updateEvent', async (req, { dispatch, getState }) => {
  const { calendar } = getState();

  if (calendar.isSignIn) return "update failed";
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
    handleCalendarsUpdate: (state, action) => {
      const filterIndex = state.selectedCalendars.findIndex(i => i === action.payload)
      if (state.selectedCalendars.includes(action.payload)) {
        state.selectedCalendars.splice(filterIndex, 1)
      } else {
        state.selectedCalendars.push(action.payload)
      }
      if (state.selectedCalendars.length === 0) {
        state.events.length = 0
      }
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
  },
})

export const { handleSelectEvent, handleCalendarsUpdate, handleIsSignIn } = appCalendarSlice.actions

export default appCalendarSlice.reducer
