import { MS_BACKEND_API_PATH } from "src/constants/msbackend";
import { MsBackendAxios } from "../../axiosUtil";
import { IScheduleResponse } from "src/model/user/schedule";

interface GetRequest {
  from: string;
  to: string;
}

export const GetUserSchedule = (req: GetRequest) => {
  return MsBackendAxios.get<IScheduleResponse[]>(
    MS_BACKEND_API_PATH.GET_SCHEDULE,
    { params: req }
  );
};

interface PostRequest {
  title: string;
  start: string;
  end?: string;
  allDay: boolean;
  note: string;
  isPublic: boolean;
  repeatInfo?: RepeatInfo | null;
}

export interface RepeatInfo {
  repeatCode: RepeatCode;
  end: string;
}
export type RepeatCode = "DAYS" | "WEEKS" | "MONTHS" | "YEARS";

export const PostUserSchedule = (req: PostRequest) => {
  return MsBackendAxios.post<string>(
    MS_BACKEND_API_PATH.PUT_SCHEDULE,
    req
  );
};

interface PutRequest {
  scheduleId: number;
  title: string;
  start: string;
  end: string;
  allDay: boolean;
  note: string;
  isPublic: boolean;
  scheduleUpdateCode: ScheduleUpdateCode;
}

export type ScheduleUpdateCode = "ONLY_THIS" | "ALL" | "THIS_AND_FUTURE";

export const PutUserSchedule = (req: PutRequest) => {
  return MsBackendAxios.put<string>(MS_BACKEND_API_PATH.PUT_SCHEDULE, req);
};
