import React from 'react'


import Banner from '../components/homepage/Banner'
import Brands from '../components/homepage/Brands'
import Features from '../components/homepage/Features'
import Categories from '../components/homepage/Categories'
import Offers from '../components/homepage/Offers'
import JustArrived from '../components/homepage/JustArrived'



export default function Homepage() {
  return (
    <>
        <Banner/>
        <Features/>
        <Categories/>
        <Offers/>
        <JustArrived/>
        <Brands/>
    </>
  )
}
