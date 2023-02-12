import { MS_BACKEND_API_PATH } from "src/constants/msbackend";
import { MsBackendAxios } from "../../axiosUtil";
import { IUserResponse } from "src/model/user/user";

export const GetFollowers = (req: Request) => {
    return MsBackendAxios.get<IUserResponse[]>(
        MS_BACKEND_API_PATH.GET_FOLLOWER,
        {
            params: req,
        }
    );
};

export const GetFollowings = (req: Request) => {
    return MsBackendAxios.get<IUserResponse[]>(
        MS_BACKEND_API_PATH.GET_FOLLOWING,
        {
            params: req,
        }
    );
};

interface Request {
    personalKey: string;
}

export const FollowRequest = (req: Request) => {
    return MsBackendAxios.post<string>(
        MS_BACKEND_API_PATH.POST_FOLLOW_REQUEST,
        req
    );
};

export const FollowCancel = (req: Request) => {
    return MsBackendAxios.put<string>(
        MS_BACKEND_API_PATH.PUT_FOLLOW_DELETE,
        req
    )
}

export const FollowerAccept = (req: Request) => {
    return MsBackendAxios.put<string>(
        MS_BACKEND_API_PATH.PUT_FOLLOWER_ACCEPT,
        req
    )
}

export const FollowerDelete = (req: Request) => {
    return MsBackendAxios.put<string>(
        MS_BACKEND_API_PATH.PUT_FOLLOWER_DELETE,
        req
    )
}