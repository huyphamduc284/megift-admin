import React from 'react'
import CIcon from '@coreui/icons-react'
import productIcon from './assets/images/product-icon.png'
import dashboardIcon from './assets/images/dashboard-icon.png'
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
    icon: <img src={dashboardIcon} alt="Dashboard" className="nav-icon" style={{ width: '30px', height: '30px' }} />,
  },
  {
    component: CNavItem,
    name: 'Products',
    to: '/product',
    icon: <img src={productIcon} alt="Products" className="nav-icon" style={{ width: '20px', height: '20px' }} />,
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
]

export default _nav
