export interface IScheduleResponse {
  scheduleId: number;
  title: string;
  start: string;
  end: string;
  allDay: boolean;
  note: string;
  isPublic: boolean;
  members: IMember[];
}

export interface IMember {
  id: string;
  email: string;
  nickName: string;
  acceptedStatus: AcceptedStatus;
}

export type AcceptedStatus = "WAITING" | "REFUSED" | "ACCEPTED";

/**
 * full calendar 表示用
 */
export interface FullCalendarFormat {
  id: string;
  title: string;
  start: string;
  end: string;
  allDay: boolean;
  note: string;
  isPublic: boolean;
  members: IMember[];
}
