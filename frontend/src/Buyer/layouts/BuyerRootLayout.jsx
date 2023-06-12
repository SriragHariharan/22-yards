import React from 'react'
import Header from '../components/homepage/Header'
import Footer from '../components/homepage/Footer'
import { Outlet } from 'react-router-dom'

export default function BuyerHomepage() {
  return (
    <div>
        <Header/>
        <main>
            <Outlet/>
        </main>
        <Footer/>
    </div>
  )
}
