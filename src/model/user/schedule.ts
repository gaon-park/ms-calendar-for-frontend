export interface IScheduleResponse {
  officials: ScheduleOfficial[];
  personals: SchedulePersonal[];
}

export interface ScheduleOfficial {
  scheduleId: number;
  title: string;
  start: string;
  end?: string;
  allDay: boolean;
  note?: string;
  byAdmin: boolean;
}

export interface SchedulePersonalParent {
  [name: string]: SchedulePersonal[]
}
export interface SchedulePersonal {
  scheduleId: number;
  title: string;
  start: string;
  end?: string;
  allDay: boolean;
  note?: string;
  ownerId: string;
  isPublic: boolean;
  members: IMember[];
}

export interface IMember {
  id?: string;
  accountId: string;
  nickName: string;
  avatarImg: string;
  acceptedStatus: AcceptedStatus;
}

export type AcceptedStatus = "WAITING" | "REFUSED" | "ACCEPTED";
