// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): VerticalNavItemsType => {
  return [
    {
      title: '대시보드',
      icon: 'mdi:home-outline',
      badgeContent: 'new',
      badgeColor: 'error',
      children: [
        {
          title: '전체 큐브 데이터',
          path: '/dashboards/analytics/common'
        },
        {
          title: '내 큐브 데이터',
          path: '/dashboards/analytics/personal'
        },
      ]
    },
    {
      sectionTitle: '앱 & 페이지'
    },
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
