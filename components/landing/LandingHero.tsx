'use client'

import Link from 'next/link'
import { Zap, ArrowRight, PlayCircle, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

export default function LandingHero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-grid z-0 pointer-events-none"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-primary/20 rounded-[100%] blur-[120px] -z-10 opacity-30 animate-pulse"></div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium tracking-wide uppercase mb-8 animate-fade-in-up hover:bg-primary/15 transition-colors cursor-default">
          <Zap className="w-3 h-3" />
          AI-Powered Study Companion
        </div>

        <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] mb-6 animate-fade-in-up-delay-1">
          Think Deeper, <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-blue-500 to-teal-400">
            Remember Longer
          </span>
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in-up-delay-2">
          Transform your reading into lasting understanding with AI-powered study sessions, generated quizzes, and instant feedback.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up-delay-2">
          <Link href="/study">
            <Button className="w-full sm:w-auto h-12 px-8 rounded-full bg-foreground text-background hover:bg-foreground/90 dark:bg-white dark:text-background dark:hover:bg-zinc-200 font-semibold transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2 shadow-lg dark:shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)]">
              Start Studying
              <ArrowRight className="w-4 h-4" strokeWidth={2} />
            </Button>
          </Link>
          <button className="w-full sm:w-auto h-12 px-8 rounded-full bg-muted border border-border dark:bg-zinc-900/50 dark:border-white/10 text-muted-foreground dark:text-zinc-300 hover:text-foreground dark:hover:text-white hover:bg-muted/80 dark:hover:bg-white/5 font-medium transition-all backdrop-blur-sm flex items-center justify-center gap-2">
            <PlayCircle className="w-4 h-4" />
            Watch Demo
          </button>
        </div>

        <div className="mt-20 relative mx-auto max-w-3xl animate-fade-in-up-delay-2 hidden md:block group">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary via-secondary to-accent rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
          <Card className="relative bg-card dark:bg-card border border-border dark:border-white/10 rounded-xl overflow-hidden shadow-2xl">
            <div className="h-8 bg-muted/50 dark:bg-white/5 border-b border-border dark:border-white/5 flex items-center px-4 gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/20"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/20"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/20"></div>
            </div>
            <div className="p-8 flex gap-8 items-start">
              <div className="flex-1 space-y-4">
                <div className="h-4 bg-muted dark:bg-zinc-800 rounded w-3/4 animate-pulse"></div>
                <div className="h-4 bg-muted dark:bg-zinc-800 rounded w-full animate-pulse" style={{ animationDelay: '75ms' }}></div>
                <div className="h-4 bg-muted dark:bg-zinc-800 rounded w-5/6 animate-pulse" style={{ animationDelay: '150ms' }}></div>
                <div className="h-20 bg-primary/10 border border-primary/20 rounded-lg p-4 mt-4">
                  <div className="flex items-center gap-2 text-primary text-xs font-semibold mb-2">
                    <Sparkles className="w-3 h-3" />
                    AI Insight
                  </div>
                  <div className="h-2 bg-primary/20 rounded w-full mb-2"></div>
                  <div className="h-2 bg-primary/20 rounded w-2/3"></div>
                </div>
              </div>
              <div className="w-1/3 bg-muted dark:bg-zinc-900 rounded-lg border border-border dark:border-white/5 p-4">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs text-muted-foreground dark:text-zinc-500 font-medium">Progress</span>
                  <span className="text-xs text-success">92%</span>
                </div>
                <div className="space-y-2">
                  <div className="h-8 bg-background dark:bg-zinc-800 rounded border border-border dark:border-white/5"></div>
                  <div className="h-8 bg-background dark:bg-zinc-800 rounded border border-border dark:border-white/5"></div>
                  <div className="h-8 bg-primary text-primary-foreground text-[10px] flex items-center justify-center font-medium rounded shadow-lg shadow-primary/20">
                    Generate Quiz
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}

