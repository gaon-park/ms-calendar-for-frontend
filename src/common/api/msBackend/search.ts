import { MS_BACKEND_API_PATH } from "src/constants/msbackend";
import { IProfile } from "src/model/user/profile";
import { IUserResponse } from "src/model/user/user";
import { MsBackendAxios } from "../axiosUtil";

interface Request {
    keyword: string
    world: string
    job: string
    jobDetail: string
}

export interface SearchUserResponse {
    users: IProfile[]
    fullHit: number
}

export const SearchUser = (req: Request) => {
    return MsBackendAxios.get<SearchUserResponse>(
        MS_BACKEND_API_PATH.GET_SEARCH_USER,
        { params : req}
    );
};
