import { MsBackendAxios } from "../../axiosUtil";
import { MS_BACKEND_API_PATH } from "src/constants/msbackend";
import { ItemDashboardResponse } from "src/model/dashboard/dashboard";

export interface ItemDashboardRequest {
    item: string
    cube: string
    option1: string
    option2: string
    option3: string
    optionValue1: number
    optionValue2: number
    optionValue3: number
}

export const GetItemDashboard = (req: ItemDashboardRequest) => {
    return MsBackendAxios.get<ItemDashboardResponse>(
        MS_BACKEND_API_PATH.GET_DASHBOARD_FOR_ITEM_TABLE,
        {
            params: req
        }
    )
}
