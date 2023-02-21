import { MS_BACKEND_API_PATH } from "src/constants/msbackend";
import { NotificationResponse } from "src/model/user/notification";
import { MsBackendAxios } from "../../axiosUtil";

export const GetNotifications = () => {
    return MsBackendAxios.get<NotificationResponse[]>(
        MS_BACKEND_API_PATH.GET_NOTIFICATIONS,
    )
}

export const ReadAllNotifications = () => {
    return MsBackendAxios.put<string>(
        MS_BACKEND_API_PATH.READ_ALL_NOTIFICATIONS,
    )
}

interface ReadOneNotificationRequest {
    id: number
}

export const ReadOneNotification = (req: ReadOneNotificationRequest) => {
    return MsBackendAxios.put<string>(
        MS_BACKEND_API_PATH.READ_ONE_NOTIFICATION,
        req
    )
}
