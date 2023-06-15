import React from 'react'
import Banner from '../components/homepage/Banner'
import BestSelling from '../components/homepage/BestSelling'
import Brands from '../components/homepage/Brands'
import Features from '../components/homepage/Features'

export default function Homepage() {
  return (
    <>
        <Banner/>
        <Features/>
        <BestSelling/>
        <Brands/>
    </>
  )
}
