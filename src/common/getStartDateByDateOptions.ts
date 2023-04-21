import { DateOption } from "src/types/reactDatepickerTypes"

export const getStartDate = (dateOption: DateOption) => {
    const now = new Date()
    const start = new Date(now)
    if (dateOption === '최근 7일') {
        start.setDate(now.getDate() - 7)
    } else if (dateOption === '최근 한 달') {
        start.setMonth(now.getMonth() - 1)
    } else if (dateOption === '최근 두 달') {
        start.setMonth(now.getMonth() - 2)
    } else if (dateOption === '최근 세 달') {
        start.setMonth(now.getMonth() - 3)
    } else {
        start.setFullYear(2022, 10, 25)
    }

    return start
}
