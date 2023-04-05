import { MsBackendAxios } from "../../axiosUtil";
import { MS_BACKEND_API_PATH } from "src/constants/msbackend";
import { CubeOverviewResponse, CubeHistoryResponse, WholeRecordDashboardResponse, GradeUpDashboard, ItemCount } from "src/model/dashboard/dashboard";

export interface CubeOverviewRequest {
    startDate: string
    endDate: string
}

export const GetCubeOverview = (req: CubeOverviewRequest) => {
    return MsBackendAxios.get<CubeOverviewResponse>(
        MS_BACKEND_API_PATH.GET_CUBE_OVERVIEW,
        {
            params: req
        }
    )
}

export const GetCubeOverviewPersonal = (req: CubeOverviewRequest) => {
    return MsBackendAxios.get<CubeOverviewResponse>(
        MS_BACKEND_API_PATH.GET_CUBE_OVERVIEW_PERSONAL,
        {
            params: req
        }
    )
}

export const GetItemFilterOptionsForSearch = () => {
    return MsBackendAxios.get<string[]>(
        MS_BACKEND_API_PATH.GET_ITEM_FILTER_OPTIONS_FOR_SEARCH,
    )
}

export const GetItemFilterOptions = () => {
    return MsBackendAxios.get<string[]>(
        MS_BACKEND_API_PATH.GET_ITEM_FILTER_OPTIONS,
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

interface GradeUpDashboardRequest {
    startDate: string
    endDate: string
    grade: string
    nextGrade: string
}

export const GetGradeUpDashboard = (req: GradeUpDashboardRequest) => {
    return MsBackendAxios.get<GradeUpDashboard>(
        MS_BACKEND_API_PATH.GET_GRADE_UP_DASHBOARD,
        {
            params: req
        }
    )
}

interface GradeUpDashboardPersonalRequest {
    item: string
    startDate: string
    endDate: string
    grade: string
    nextGrade: string
}

export const GetGradeUpDashboardPersonal = (req: GradeUpDashboardPersonalRequest) => {
    return MsBackendAxios.get<GradeUpDashboard>(
        MS_BACKEND_API_PATH.GET_GRADE_UP_DASHBOARD_PERSONAL,
        {
            params: req
        }
    )
}

export interface TopFiveDashboardRequest {
    cubeType: string
    startDate: string
    endDate: string
}

export const GetTopFive = (req: TopFiveDashboardRequest) => {
    return MsBackendAxios.get<ItemCount[]>(
        MS_BACKEND_API_PATH.GET_TOP_FIVE,
        {
            params: req
        }
    )
}

export const GetTopFivePersonal = (req: TopFiveDashboardRequest) => {
    return MsBackendAxios.get<ItemCount[]>(
        MS_BACKEND_API_PATH.GET_TOP_FIVE_PERSONAL,
        {
            params: req
        }
    )
}