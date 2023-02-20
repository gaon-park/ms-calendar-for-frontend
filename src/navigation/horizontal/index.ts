// ** Type import
import { HorizontalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): HorizontalNavItemsType => {
  return [
    {
      title: 'Calendar',
      icon: 'mdi:calendar-blank-outline',
      path: '/apps/calendar'
    },
    {
      title: 'Search User',
      icon: 'mdi:account-outline',
      path: '/apps/user/list'
    }
  ]
}

export default navigation
