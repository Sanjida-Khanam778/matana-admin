import HeroSection from '../Hero/Hero'
import StatsBar from '../../components/StatsBar/StatsBar'
import FeaturedBusinesses from '../../components/Featuredbusinesses/Featuredbusinesses'
import BrowseCategories from '../../components/Browsecategories/Browsecategories'
import BrowseByCommunity from '../../components/Browsebycommunity/Browsebycommunity'
import AboutMatana from '../../components/Aboutmatana/Aboutmatana'
import ContactUs from '../../components/Contactus/Contactus'

export default function Home() {
  return (
    <div>
        <HeroSection />
        <StatsBar />
        <FeaturedBusinesses />
        <BrowseCategories />
        <BrowseByCommunity />
        <AboutMatana />
        <ContactUs />
    </div>
  )
}