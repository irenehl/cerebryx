export default function LandingStats() {
  const stats = [
    { value: '10k+', label: 'Active Students' },
    { value: '2M+', label: 'Quizzes Generated' },
    { value: '98%', label: 'Satisfaction Rate' },
    { value: '4.9/5', label: 'App Store Rating' },
  ]

  return (
    <section className="py-12 border-y border-border dark:border-white/5 bg-muted/20 dark:bg-white/[0.02]">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {stats.map((stat, index) => (
          <div key={index}>
            <div className="text-3xl font-bold text-foreground mb-1">{stat.value}</div>
            <div className="text-xs font-medium text-muted-foreground uppercase tracking-widest">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

