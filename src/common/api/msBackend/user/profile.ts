import { MS_BACKEND_API_PATH } from "src/constants/msbackend";
import { MsBackendAxios } from "../../axiosUtil";
import { ApiKeyResponse, IProfileResponse, PostApiKeyReq, PutJsonRequest } from "src/model/user/profile";

export const GetUserProfile = () => {
  return MsBackendAxios.get<IProfileResponse>(
    MS_BACKEND_API_PATH.GET_USER_PROFILE
  );
};

export const PutJsonUserProfile = (req: PutJsonRequest) => {
  return MsBackendAxios.put<IProfileResponse>(
    MS_BACKEND_API_PATH.PUT_USER_PROFILE,
    req
  );
};

export const DeleteAccount = () => {
  return MsBackendAxios.delete(
    MS_BACKEND_API_PATH.DELETE_ACCOUNT,
  )
}

export const PostApiKey = (req: PostApiKeyReq) => {
  return MsBackendAxios.post<string>(
    MS_BACKEND_API_PATH.POST_API_KEY,
    req
  )
}

export const GetApiKey = () => {
  return MsBackendAxios.get<ApiKeyResponse | undefined>(
    MS_BACKEND_API_PATH.GET_API_KEY,
  )
}
