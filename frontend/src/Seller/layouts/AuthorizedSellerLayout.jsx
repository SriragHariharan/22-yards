import React from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import { Outlet } from 'react-router-dom'

export default function AuthorizedSellerLayout() {
  return (
    <div>
        <Header/>
        <main className="seller-app">
            <Outlet/>
        </main>
        <Footer/>
    </div>
  )
}
