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

export interface ItemDashboardResponse {
    itemList: string[]
    cubeHistories: CubeHistoryResponse[]
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