import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilChartPie,
  cilCart,
  cilApplications,
  cilBoltCircle,
  cilSettings,
  cilPeople
} from '@coreui/icons'
import { CNavItem } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilApplications} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Product',
    to: '/product',
    icon: <CIcon icon={cilBoltCircle} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Orders',
    to: '/order',
    icon: <CIcon icon={cilCart} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Customers',
    to: '/customer',
    icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Reviews',
    to: '/review',
    icon: <CIcon icon={cilChartPie} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Settings',
    to: '/setting',
    icon: <CIcon icon={cilSettings} customClassName="nav-icon" />,
  }
]

export default _nav
