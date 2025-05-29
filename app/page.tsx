import Hero from './components/Hero'
import Metrics from './components/Metrics'
import ReviewsSlider from './components/ReviewsSlider'
import CTASection from './components/CTASection'

export default function Home() {
  return (
    <main className="overflow-x-hidden">
      <Hero />
      <Metrics />
      <ReviewsSlider />
      <CTASection />
    </main>
  )
}
