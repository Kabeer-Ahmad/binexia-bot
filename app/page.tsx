import Hero from './components/Hero'
import Metrics from './components/Metrics'
import ReviewsSlider from './components/ReviewsSlider'
import SupportedPlatforms from './components/SupportedPlatforms'
import CTASection from './components/CTASection'

export default function Home() {
  return (
    <main className="overflow-x-hidden">
      <Hero />
      <Metrics />
      <SupportedPlatforms />
      <ReviewsSlider />
      <CTASection />
    </main>
  )
}
