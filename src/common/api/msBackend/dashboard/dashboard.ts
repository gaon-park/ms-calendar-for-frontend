import { MsBackendAxios } from "../../axiosUtil";
import { MS_BACKEND_API_PATH } from "src/constants/msbackend";
import { CubeHistoryResponse, WholeRecordDashboardResponse } from "src/model/dashboard/dashboard";

export const GetItemFilterOptions = () => {
    return MsBackendAxios.get<string[]>(
        MS_BACKEND_API_PATH.GET_ITEM_FILTER_OPTIONS,
    )
}

export const GetItemFilterOptionsPersonal = () => {
    return MsBackendAxios.get<string[]>(
        MS_BACKEND_API_PATH.GET_ITEM_FILTER_OPTIONS_PERSONAL,
    )
}

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
    return MsBackendAxios.get<CubeHistoryResponse[]>(
        MS_BACKEND_API_PATH.GET_DASHBOARD_FOR_ITEM_TABLE,
        {
            params: req
        }
    )
}

export const GetItemDashboardPersonal = (req: ItemDashboardRequest) => {
    return MsBackendAxios.get<CubeHistoryResponse[]>(
        MS_BACKEND_API_PATH.GET_DASHBOARD_FOR_ITEM_TABLE_PERSONAL,
        {
            params: req
        }
    )
}

export interface GetWholeRecordDashboardRequest {
    startDate: string
    endDate: string
}

export const GetWholeRecordDashboard = (req: GetWholeRecordDashboardRequest) => {
    return MsBackendAxios.get<WholeRecordDashboardResponse>(
        MS_BACKEND_API_PATH.GET_WHOLE_RECORD_DASHBOARD,
        {
            params: req
        }
    )
}

export const GetWholeRecordDashboardPersonal = (req: GetWholeRecordDashboardRequest) => {
    return MsBackendAxios.get<WholeRecordDashboardResponse>(
        MS_BACKEND_API_PATH.GET_WHOLE_RECORD_DASHBOARD_PERSONAL,
        {
            params: req
        }
    )
}