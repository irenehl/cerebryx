import Link from 'next/link'
import { BrainCircuit } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-border dark:border-white/5 bg-muted/30 dark:bg-black py-12 px-6 text-sm">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-2 text-muted-foreground">
          <BrainCircuit className="w-5 h-5" />
          <span>© 2024 Cerebryx Inc.</span>
        </div>

        <div className="flex gap-8 text-muted-foreground">
          <Link href="#" className="hover:text-foreground transition-colors">
            Privacy
          </Link>
          <Link href="#" className="hover:text-foreground transition-colors">
            Terms
          </Link>
          <Link href="#" className="hover:text-foreground transition-colors">
            Twitter
          </Link>
          <Link href="#" className="hover:text-foreground transition-colors">
            GitHub
          </Link>
        </div>
      </div>
    </footer>
  )
}

