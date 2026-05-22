import React from 'react'
import { Outlet } from 'react-router-dom'

import '../../themes/seller-theme.css'
import '../../themes/seller-mdb-overrides.css'

export default function SellerRootLayout() {
  return (
    <div data-portal="seller">
        <Outlet />
    </div>
  )
}
