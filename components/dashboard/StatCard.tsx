'use client'

import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { LucideIcon, TrendingUp } from 'lucide-react'
import { cn } from '@/lib/utils'

interface StatCardProps {
  title: string
  value: string | number
  icon: LucideIcon
  iconColor?: string
  trend?: {
    value: string
    isPositive: boolean
  }
  subtitle?: string
}

export default function StatCard({
  title,
  value,
  icon: Icon,
  iconColor = 'text-primary',
  trend,
  subtitle,
}: StatCardProps) {
  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <Icon className={cn('h-5 w-5', iconColor)} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold text-foreground mb-1">{value}</div>
        {trend && (
          <div className="flex items-center gap-1 text-sm">
            <TrendingUp
              className={cn(
                'h-4 w-4',
                trend.isPositive ? 'text-success' : 'text-muted-foreground'
              )}
            />
            <span
              className={cn(
                trend.isPositive ? 'text-success' : 'text-muted-foreground'
              )}
            >
              {trend.value}
            </span>
          </div>
        )}
        {subtitle && !trend && (
          <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
        )}
      </CardContent>
    </Card>
  )
}





