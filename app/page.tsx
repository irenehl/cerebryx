import { Metadata } from 'next'
import LandingHero from '@/components/landing/LandingHero'
import LandingFeatures from '@/components/landing/LandingFeatures'
import LandingStats from '@/components/landing/LandingStats'
import LandingCTA from '@/components/landing/LandingCTA'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Cerebryx • Think Deeper, Remember Longer',
  description: 'Transform your reading into lasting understanding with AI-powered study sessions, generated quizzes, and instant feedback.',
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30 overflow-x-hidden">
      <LandingHero />
      <LandingFeatures />
      <LandingStats />
      <LandingCTA />
      <Footer />
    </div>
  )
}
