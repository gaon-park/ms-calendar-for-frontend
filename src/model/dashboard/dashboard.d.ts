export interface CubeHistoryResponse {
    id: string
    targetItem: string
    cubeType: string
    beforeOption1: string
    beforeOption2: string
    beforeOption3: string
    afterOption1: string
    afterOption2: string
    afterOption3: string
    potentialOptionGrade: string
    itemUpgrade: boolean
}

export interface CubeEventRecordResponse {
    category: string
    cubeType: string
    count: number
}

export interface WholeRecordDashboardResponse {
    categories: string[]
    data: CubeEventRecordResponse[]
}

export interface CubeCount {
    allCount: number
    susangCount: number
    jangyinCount: number
    myungjangCount: number
    redCount: number
    blackCount: number
    additionalCount: number
    susangAdditionalCount: number
}

export interface CubeOverviewResponse {
    registeredApiKeyCount: number | null
    counts: CubeCount
}

export interface GradeUp {
    actual: number
    expected: number
}

export interface GradeUpDashboard {
    epic: GradeUp
    unique: GradeUp
    legendary: GradeUp
}

export interface ItemCount {
    item: string
    count: number
}