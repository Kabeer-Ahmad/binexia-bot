import Hero from './components/Hero'
import Demo from './components/Demo'
import Metrics from './components/Metrics'
import Features from './components/Features'
import SupportedPlatforms from './components/SupportedPlatforms'
import ReviewsSlider from './components/ReviewsSlider'
import CTASection from './components/CTASection'

export default function Home() {
  return (
    <main className="overflow-x-hidden">
      <Hero />
      <Demo />
      <Metrics />
      <Features />
      <SupportedPlatforms />
      <ReviewsSlider />
      <CTASection />
    </main>
  )
}
