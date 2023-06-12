import React from 'react'
import Header from '../components/homepage/Header'
import Banner from '../components/homepage/Banner'
import BestSelling from '../components/homepage/BestSelling'
import Brands from '../components/homepage/Brands'
import Footer from '../components/homepage/Footer'

export default function Homepage() {
  return (
    <>
        <Header/>
        <Banner/>
        <BestSelling/>
        <Brands/>
        <Footer/>
    </>
  )
}
