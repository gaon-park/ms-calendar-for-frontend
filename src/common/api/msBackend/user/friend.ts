import { MS_BACKEND_API_PATH } from "src/constants/msbackend";
import { MsBackendAxios } from "../../axiosUtil";
import { IUserResponse } from "src/model/user/user";

export const GetFriends = (req: Request) => {
    return MsBackendAxios.get<IUserResponse[]>(
        MS_BACKEND_API_PATH.GET_USER_FRIEND,
        {
            params: req,
        }
    );
};

interface Request {
    personalKey: string;
}

export const FriendRequest = (req: Request) => {
    return MsBackendAxios.post<string>(
        MS_BACKEND_API_PATH.POST_FRIEND_REQUEST,
        req
    );
};

export const FriendDelete = (req: Request) => {
    return MsBackendAxios.put<string>(
        MS_BACKEND_API_PATH.PUT_FRIEND_DELETE,
        req
    )
}

export const FriendAccept = (req: Request) => {
    return MsBackendAxios.put<string>(
        MS_BACKEND_API_PATH.PUT_FRIEND_ACCEPT,
        req
    )
}

export const FriendRefuse = (req: Request) => {
    return MsBackendAxios.put<string>(
        MS_BACKEND_API_PATH.PUT_FRIEND_REFUSE,
        req
    )
}