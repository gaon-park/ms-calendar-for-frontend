import { MS_BACKEND_API_PATH } from "src/constants/msbackend";
import { IProfile, IProfileResponse } from "src/model/user/profile";
import { SimpleUserResponse } from "src/model/user/user";
import { MsBackendAxios } from "../axiosUtil";

interface Request {
    keyword: string
    world: string
    job: string
    jobDetail: string
}

export const SearchUser = (req: Request) => {
    return MsBackendAxios.get<IProfile[]>(
        MS_BACKEND_API_PATH.GET_SEARCH_USER,
        { params: req }
    );
};

interface SearchUserProfileRequest {
    accountId: string
}

export const SearchUserProfile = (req: SearchUserProfileRequest) => {
    return MsBackendAxios.get<IProfileResponse>(
        MS_BACKEND_API_PATH.GET_SEARCH_USER_PROFILE,
        {
            params: req
        }
    )
}

interface SearchUserListForSchedule {
    keyword: string
}

export const SearchUserForScheduleInvite = (req: SearchUserListForSchedule) => {
    return MsBackendAxios.get<SimpleUserResponse[]>(
        MS_BACKEND_API_PATH.GET_SEARCH_USER_FOR_SCHEDULE_INVITE,
        {
            params: req
        }
    )
}
