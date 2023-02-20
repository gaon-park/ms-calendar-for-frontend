import { MS_BACKEND_API_PATH } from "src/constants/msbackend";
import { MsBackendAxios } from "../../axiosUtil";
import { IScheduleResponse, SchedulePersonal } from "src/model/user/schedule";

export interface GetUserScheduleRequest {
  userIds: string[],
  from: string;
  to: string;
}

export const GetUserSchedule = (req: GetUserScheduleRequest) => {
  return MsBackendAxios.get<IScheduleResponse>(
    MS_BACKEND_API_PATH.GET_SCHEDULE,
    { params: req }
  );
}

export interface GetUserScheduleRequest {
  userIds: string[],
  from: string;
  to: string;
}

export interface SearchOtherScheduleRequest {
  userId: string
  from: string
  to: string
}

export const SearchOtherSchedule = (req: SearchOtherScheduleRequest) => {
  return MsBackendAxios.get<SchedulePersonal[]>(
    MS_BACKEND_API_PATH.GET_OTHER_SCHEDULE,
    { params: req }
  );
}

export interface PostUserScheduleRequest {
  title: string;
  start: string;
  end?: string;
  repeatInfo?: RepeatInfo;
  allDay?: boolean;
  memberIds: string[];
  note?: string;
  isPublic: boolean;
  forOfficial?: boolean;
}

export interface RepeatInfo {
  repeatCode: string | RepeatCode;
  end?: string;
}
export type RepeatCode = "DAYS" | "WEEKS" | "MONTHS" | "YEARS";

export const PostUserSchedule = (req: PostUserScheduleRequest) => {
  return MsBackendAxios.post<string>(
    MS_BACKEND_API_PATH.PUT_SCHEDULE,
    req
  );
};

export interface PutUserScheduleRequest {
  scheduleId: number;
  title: string;
  start: string;
  end?: string;
  allDay: boolean;
  memberIds: string[];
  note?: string;
  isPublic: boolean;
  scheduleUpdateCode: string | ScheduleUpdateCode;
  forOfficial: boolean;
}

export type ScheduleUpdateCode = "ONLY_THIS" | "ALL" | "THIS_AND_FUTURE";

export const PutUserSchedule = (req: PutUserScheduleRequest) => {
  return MsBackendAxios.put<string>(MS_BACKEND_API_PATH.PUT_SCHEDULE, req);
};

export const PutScheduleRefuse = (req: { scheduleId: number }) => {
  return MsBackendAxios.put<string>(MS_BACKEND_API_PATH.PUT_API_SCHEDULE_REFUSE, req);
};

export type DeleteScheduleRequest = {
  scheduleId: number,
  scheduleUpdateCode: string | ScheduleUpdateCode,
  forOfficial: boolean
}

export const PutScheduleDelete = (req: DeleteScheduleRequest) => {
  return MsBackendAxios.put<string>(MS_BACKEND_API_PATH.PUT_API_SCHEDULE_DELETE, req);
};

export const PutScheduleAccept = (req: { scheduleId: number }) => {
  return MsBackendAxios.put<string>(MS_BACKEND_API_PATH.PUT_API_SCHEDULE_ACCEPT, req);
};
