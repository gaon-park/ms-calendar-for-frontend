import { MS_BACKEND_API_PATH } from "src/constants/msbackend";
import { MsBackendAxios } from "../../axiosUtil";

interface Request {
  code: string;
}
interface LoginResponse {
  accessToken: string;
}

export const MsApiOauth2Google = (req: Request) =>
  MsBackendAxios.get<LoginResponse>(MS_BACKEND_API_PATH.GET_OAUTH2_GOOGLE, {
    params: req,
  });
