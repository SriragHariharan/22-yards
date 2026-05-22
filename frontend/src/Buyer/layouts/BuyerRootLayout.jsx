import React from 'react'
import Header from '../components/homepage/Header'
import Footer from '../components/homepage/Footer'
import { Outlet } from 'react-router-dom'
import '../styles/index.css'

export default function BuyerHomepage() {
  return (
    <div data-portal="buyer">
      <Header/>
      <main className="buyer-main">
        <Outlet/>
      </main>
      <Footer/>
    </div>
  )
}
