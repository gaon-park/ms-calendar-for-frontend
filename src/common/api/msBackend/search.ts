import { MS_BACKEND_API_PATH } from "~/constants/msbackend";
import { IUserResponse } from "~/model/user/user";
import { MsBackendAxios } from "../axiosUtil";

interface Request {
    keyword: string;
}

export const SearchUser = (req: Request) => {
    if (req.keyword.length === 0) return;
    return MsBackendAxios.get<IUserResponse[]>(
        MS_BACKEND_API_PATH.GET_SEARCH_USER,
        { params : req}
    );
};
