import { MS_BACKEND_API_PATH } from "src/constants/msbackend";
import { MsBackendAxios } from "../../axiosUtil";

export const Logout = () => 
    MsBackendAxios.get(MS_BACKEND_API_PATH.LOGOUT);