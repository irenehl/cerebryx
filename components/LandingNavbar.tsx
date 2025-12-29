'use client'

import Link from 'next/link'
import { BookOpen, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/ThemeToggle'

export default function LandingNavbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 dark:border-white/5 bg-background/60 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="p-1.5 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg border border-border/50 dark:border-white/5 group-hover:border-primary/50 transition-colors">
            <BookOpen className="w-5 h-5 text-primary" strokeWidth={1.5} />
          </div>
          <span className="text-lg font-semibold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-foreground to-muted-foreground dark:from-white dark:to-zinc-400">
            Cerebryx
          </span>
        </Link>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Link href="/auth">
            <button className="hidden md:flex text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Sign In
            </button>
          </Link>
          <Link href="/study">
            <Button className="bg-muted hover:bg-muted/80 dark:bg-white/5 dark:hover:bg-white/10 text-foreground dark:text-white border border-border dark:border-white/10 px-4 py-2 rounded-full text-sm font-medium transition-all hover:scale-105 active:scale-95 flex items-center gap-2 group">
              Get Started
              <ArrowRight className="w-4 h-4 text-muted-foreground dark:text-zinc-400 group-hover:text-foreground dark:group-hover:text-white transition-colors" />
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  )
}

