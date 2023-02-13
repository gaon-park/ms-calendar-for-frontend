// ** React Imports
import { ReactNode, useContext } from 'react'

// ** Types
import { NavLink } from 'src/@core/layouts/types'

interface Props {
  navLink?: NavLink
  children: ReactNode
}

const CanViewNavLink = (props: Props) => {
  // ** Props
  const { children } = props

  return <>{children}</>
}

export default CanViewNavLink
