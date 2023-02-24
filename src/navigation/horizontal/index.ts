// ** Type import
import { HorizontalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): HorizontalNavItemsType => {
  return [
    {
      icon: 'mdi:home-outline',
      title: '대시보드',
      children: [
        {
          title: '전체 큐브 데이터',
          icon: 'mdi:chart-donut',
          path: '/dashboards/analytics/common'
        },
        {
          title: '내 큐브 데이터',
          icon: 'mdi:chart-timeline-variant',
          path: '/dashboards/analytics/personal'
        },
      ]
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
