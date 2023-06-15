import React from 'react'
import Header from '../components/homepage/Header'
import Footer from '../components/homepage/Footer'
import { Outlet } from 'react-router-dom'
import Topbar from '../components/homepage/Topbar'

export default function BuyerHomepage() {
  return (
    <div>
      <Topbar/>
        <Header/>
        <main>
            <Outlet/>
        </main>
        <Footer/>
    </div>
  )
}
