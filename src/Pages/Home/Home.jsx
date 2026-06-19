import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import HeroSection from '../Hero/Hero'
import FeaturedBusinesses from '../../components/Featuredbusinesses/Featuredbusinesses'
import BrowseCategories from '../../components/Browsecategories/Browsecategories'
import EventVenues from '../../components/Eventvenues/Eventvenues'
import BrowseByCommunity from '../../components/Browsebycommunity/Browsebycommunity'
import AboutMatana from '../../components/Aboutmatana/Aboutmatana'
import ContactUs from '../../components/Contactus/Contactus'
import Footer from '../../components/Footer/Footer'

export default function Home() {
  return (
    <div>
        <HeroSection />
        <FeaturedBusinesses />
        <BrowseCategories />
        {/* <EventVenues /> */}
        <BrowseByCommunity />
        <AboutMatana />
        <ContactUs />
    </div>
  )
}
