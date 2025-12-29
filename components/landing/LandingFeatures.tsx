import {
  BookOpen,
  BrainCircuit,
  BarChart2,
  Bookmark,
  Zap,
  ShieldCheck,
} from 'lucide-react'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'

type FeatureCardProps = {
  icon: React.ReactNode
  title: string
  description: string
  accentColor: 'primary' | 'secondary' | 'accent' | 'purple' | 'blue' | 'teal'
}

function FeatureCard({ icon, title, description, accentColor }: FeatureCardProps) {
  const iconColorClasses = {
    primary: 'border-primary/20 bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white',
    secondary: 'border-secondary/20 bg-secondary/10 text-secondary group-hover:bg-secondary group-hover:text-white',
    accent: 'border-accent/20 bg-accent/10 text-accent group-hover:bg-accent group-hover:text-white',
    purple: 'border-purple-500/20 bg-purple-500/10 text-purple-400 group-hover:bg-purple-500 group-hover:text-white',
    blue: 'border-blue-500/20 bg-blue-500/10 text-blue-400 group-hover:bg-blue-500 group-hover:text-white',
    teal: 'border-teal-500/20 bg-teal-500/10 text-teal-400 group-hover:bg-teal-500 group-hover:text-white',
  }

  const cardBorderClasses = {
    primary: 'hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/5',
    secondary: 'hover:border-secondary/50 hover:shadow-2xl hover:shadow-secondary/5',
    accent: 'hover:border-accent/50 hover:shadow-2xl hover:shadow-accent/5',
    purple: 'hover:border-purple-500/50 hover:shadow-2xl hover:shadow-purple-500/5',
    blue: 'hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/5',
    teal: 'hover:border-teal-500/50 hover:shadow-2xl hover:shadow-teal-500/5',
  }

  return (
    <Card className={cn(
      'group bg-card border border-border p-8 rounded-3xl transition-all duration-300 hover:-translate-y-1',
      cardBorderClasses[accentColor]
    )}>
      <div className={cn(
        'w-12 h-12 rounded-xl border flex items-center justify-center mb-6 transition-colors duration-300',
        iconColorClasses[accentColor]
      )}>
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-foreground mb-3 tracking-tight">
        {title}
      </h3>
      <p className="text-muted-foreground leading-relaxed text-sm">
        {description}
      </p>
    </Card>
  )
}

export default function LandingFeatures() {
  const features = [
    {
      icon: <BookOpen className="w-6 h-6" strokeWidth={1.5} />,
      title: 'Smart Reading Timer',
      description: 'Track your reading velocity and comprehension with our built-in focus timer optimized for deep work sessions.',
      accentColor: 'primary',
    },
    {
      icon: <BrainCircuit className="w-6 h-6" strokeWidth={1.5} />,
      title: 'AI-Powered Quizzes',
      description: 'Instantly generate relevant questions from your reading material. Test your knowledge while the concepts are fresh.',
      accentColor: 'secondary',
    },
    {
      icon: <BarChart2 className="w-6 h-6" strokeWidth={1.5} />,
      title: 'Track Your Progress',
      description: 'Visualize your learning curve with detailed analytics. See where you\'re improving and identify weak spots.',
      accentColor: 'accent',
    },
    {
      icon: <Bookmark className="w-6 h-6" strokeWidth={1.5} />,
      title: 'Save for Later',
      description: 'Bookmark difficult concepts and revisit them with spaced repetition to ensure long-term retention.',
      accentColor: 'purple',
    },
    {
      icon: <Zap className="w-6 h-6" strokeWidth={1.5} />,
      title: 'Works Everywhere',
      description: 'Seamlessly syncs across all your devices. Start reading on your phone and finish the quiz on your desktop.',
      accentColor: 'blue',
    },
    {
      icon: <ShieldCheck className="w-6 h-6" strokeWidth={1.5} />,
      title: 'Privacy First',
      description: 'Your study materials are yours. We encrypt your data and never share your uploads with third parties.',
      accentColor: 'teal',
    },
  ]

  return (
    <section className="py-24 px-6 border-t border-border dark:border-white/5 bg-muted/30 dark:bg-black/20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
            Everything You Need to <br />
            <span className="text-foreground">Master Any Material</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Powerful features designed to help you learn more effectively, retain information longer, and ace your exams.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              accentColor={feature.accentColor}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

