import { MS_BACKEND_API_PATH } from "src/constants/msbackend";
import { MsBackendAxios } from "../../axiosUtil";

interface Request {}

export const Logout = (req: Request) => 
    MsBackendAxios.get(MS_BACKEND_API_PATH.LOGOUT);