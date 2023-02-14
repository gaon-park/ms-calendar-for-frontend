import { MS_BACKEND_API_PATH } from "src/constants/msbackend";
import { MsBackendAxios } from "../../axiosUtil";
import { IUserResponse } from "src/model/user/user";

export const GetFollow = (req: Request) => {
    return MsBackendAxios.get<IUserResponse[]>(
        MS_BACKEND_API_PATH.GET_USER_FOLLOW,
        {
            params: req,
        }
    );
};

export const GetFollower = (req: Request) => {
    return MsBackendAxios.get<IUserResponse[]>(
        MS_BACKEND_API_PATH.GET_USER_FOLLOWER,
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
        MS_BACKEND_API_PATH.PUT_FOLLOW_CANCEL,
        req
    )
}

export const FollowAccept = (req: Request) => {
    return MsBackendAxios.put<string>(
        MS_BACKEND_API_PATH.PUT_FOLLOW_ACCEPT,
        req
    )
}

export const FollowerDelete = (req: Request) => {
    return MsBackendAxios.put<string>(
        MS_BACKEND_API_PATH.PUT_FOLLOWER_DELETE,
        req
    )
}