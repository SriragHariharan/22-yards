import React from 'react'
import { Outlet } from 'react-router-dom'


export default function SellerRootLayout() {
  return (
    <div>
        <Outlet />
    </div>
  )
}
