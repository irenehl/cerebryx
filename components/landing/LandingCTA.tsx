'use client'

import Link from 'next/link'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

export default function LandingCTA() {
  return (
    <section className="py-32 px-6 relative">
      <div className="max-w-4xl mx-auto relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 blur-3xl rounded-full opacity-30"></div>

        <Card className="relative bg-card border border-border dark:border-white/10 rounded-3xl p-12 md:p-20 text-center overflow-hidden">
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 bg-secondary/10 rounded-full blur-3xl"></div>

          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground mb-6">
            Ready to Transform <br /> Your Reading?
          </h2>
          <p className="text-muted-foreground text-lg mb-10 max-w-xl mx-auto">
            Start your first AI-powered study session now. Upload any PDF or paste text to generate instant quizzes.
          </p>

          <div className="flex flex-col items-center gap-8">
            <Link href="/study">
              <Button className="h-14 px-10 rounded-full bg-foreground text-background hover:bg-foreground/90 dark:bg-white dark:text-background dark:hover:bg-zinc-200 text-lg font-semibold transition-all hover:scale-105 shadow-xl dark:shadow-white/10 flex items-center gap-2">
                Get Started Free
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>

            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-success" />
                No credit card required
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-success" />
                Start in seconds
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-success" />
                100% Free Plan available
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  )
}

