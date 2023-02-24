export type CubeType = 'SUSANG' | 'JANGYIN' | 'MYUNGJANG' | 'RED' | 'BLACK' | 'ADDITIONAL'

export interface CubeHistoryResponse {
    id: string
    targetItem: string
    cubeType: CubeType
    beforeOption1: string
    beforeOption2: string
    beforeOption3: string
    afterOption1: string
    afterOption2: string
    afterOption3: string
    potentialOptionGrade: 'RARE' | 'NORMAL' | 'EPIC' | 'UNIQUE' | 'LEGENDARY'
    itemUpgrade: boolean
}

export interface CubeEventRecordResponse {
    category: string
    cubeType: CubeType
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
}

export interface CubeItemCount {
    item: string
    cubeCount: CubeCount
}

export interface CubeOverviewResponse {
    registeredApiKeyCount: number | null
    counts: CubeCount
    topTenItems: CubeItemCount[]
}