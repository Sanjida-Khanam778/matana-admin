import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import HeroSection from '../Hero/Hero'
import FeaturedBusinesses from '../../components/Featuredbusinesses/Featuredbusinesses'
import BrowseCategories from '../../components/Browsecategories/Browsecategories'
import EventVenues from '../../components/Eventvenues/Eventvenues'
import BrowseByCommunity from '../../components/Browsebycommunity/Browsebycommunity'

export default function Home() {
  return (
    <div>
        <Navbar />
        <HeroSection />
        <FeaturedBusinesses />
        <BrowseCategories />
        <EventVenues />
        <BrowseByCommunity />
    </div>
  )
}
