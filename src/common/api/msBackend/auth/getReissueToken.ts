import { MS_BACKEND_API_PATH } from "src/constants/msbackend";
import { MsBackendAxios } from "../../axiosUtil";

interface LoginResponse {
  accessToken: string;
}

export const MsApiReissueToken = () =>
  MsBackendAxios.post<LoginResponse>(MS_BACKEND_API_PATH.POST_REISSUE_TOKEN);
