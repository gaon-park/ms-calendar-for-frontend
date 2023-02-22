// ** Type import
import { HorizontalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): HorizontalNavItemsType => {
  return [
    {
      title: '캘린더',
      icon: 'mdi:calendar-blank-outline',
      path: '/apps/calendar'
    },
    {
      title: '회원 검색',
      icon: 'mdi:account-outline',
      path: '/apps/user/list'
    },
    {
      title: '도움말',
      icon: 'ion:help',
      path: '/help'
    }
  ]
}

export default navigation
