import { MS_BACKEND_API_PATH } from "src/constants/msbackend";
import { MsBackendAxios } from "../../axiosUtil";
import { IProfile, PutJsonRequest } from "src/model/user/profile";

interface Request {}

export const GetUserProfile = (req: Request) => {
  return MsBackendAxios.get<IProfile>(
    MS_BACKEND_API_PATH.GET_USER_PROFILE,
    { params: req }
  );
};

export const PutJsonUserProfile = (req: PutJsonRequest) => {
  return MsBackendAxios.put<IProfile>(
    MS_BACKEND_API_PATH.PUT_USER_PROFILE,
    req
  );
};

export const DeleteAccount = () => {
  return MsBackendAxios.delete(
    MS_BACKEND_API_PATH.DELETE_ACCOUNT,
  )
}