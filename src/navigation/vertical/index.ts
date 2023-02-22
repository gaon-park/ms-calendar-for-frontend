// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): VerticalNavItemsType => {
  return [
    {
      sectionTitle: '앱 & 페이지'
    },
    {
      title: '캘린더',
      icon: 'mdi:calendar-blank-outline',
      path: '/apps/calendar'
    },
    {
      title: '유저 검색',
      icon: 'mdi:account-outline',
      path: '/apps/user/list'
    }
  ]
}

export default navigation
