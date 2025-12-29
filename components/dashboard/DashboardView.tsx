'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Plus, FileText, Target, Clock, CheckCircle } from 'lucide-react'
import { useHistory } from '@/hooks/useHistory'
import { useAuth } from '@/providers/AuthProvider'
import { formatStudyTime } from '@/lib/utils'
import DashboardSkeleton from './DashboardSkeleton'
import StatCard from './StatCard'
import RecentSessionsTable from './RecentSessionsTable'

const getGreeting = () => {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good morning'
  if (hour < 18) return 'Good afternoon'
  return 'Good evening'
}

export default function DashboardView() {
  const { history, settings, isLoading } = useHistory()
  const { user } = useAuth()

  if (isLoading) {
    return <DashboardSkeleton />
  }

  // Calculate statistics
  const totalSessions = history.length
  const averageScore =
    history.length > 0
      ? Math.round(
          (history.reduce((sum, entry) => sum + entry.quiz.percentage, 0) /
            history.length) *
            10
        ) / 10
      : 0
  const totalStudyTime = history.reduce(
    (sum, entry) => sum + entry.reading.actualSec,
    0
  )
  const totalQuestionsAnswered = history.reduce(
    (sum, entry) => sum + entry.quiz.questionCount,
    0
  )

  // Get recent sessions (last 5)
  const recentSessions = history.slice(0, 5)

  // Check if history is disabled
  const isHistoryDisabled = !settings.enabled

  const getUserDisplayName = () => {
    const name = user?.user_metadata?.full_name || user?.user_metadata?.name
    if (name) {
      return name.split(' ')[0] // First name only
    }
    return user?.email?.split('@')[0] || 'there'
  }

  // Calculate week-over-week change for sessions (mock data for now)
  const sessionsTrend = totalSessions > 0
    ? {
        value: '+12% from last week',
        isPositive: true,
      }
    : undefined

  // Calculate week-over-week change for study time (mock data for now)
  const studyTimeTrend = totalStudyTime > 0
    ? {
        value: '+2.5h this week',
        isPositive: true,
      }
    : undefined

  return (
    <div className="px-6 py-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Greeting Section */}
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              {getGreeting()}, {getUserDisplayName()}.
            </h1>
            <p className="text-muted-foreground mt-1">
              Ready to expand your knowledge today?
            </p>
          </div>
          <Link href="/study">
            <Button className="gap-2">
              <Plus className="h-5 w-5" />
              Start New Session
            </Button>
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Sessions"
            value={isHistoryDisabled ? '-' : totalSessions}
            icon={FileText}
            iconColor="text-primary"
            trend={sessionsTrend}
            subtitle={
              isHistoryDisabled
                ? 'Enable history in settings'
                : totalSessions === 0
                  ? 'Start your first session'
                  : undefined
            }
          />
          <StatCard
            title="Avg. Score"
            value={
              isHistoryDisabled || totalSessions === 0
                ? '-'
                : `${averageScore}%`
            }
            icon={Target}
            iconColor="text-secondary"
            subtitle={
              isHistoryDisabled
                ? 'Enable history in settings'
                : totalSessions === 0
                  ? 'Complete a quiz to see'
                  : 'Consistency is key'
            }
          />
          <StatCard
            title="Study Time"
            value={
              isHistoryDisabled || totalStudyTime === 0
                ? '0h 0m'
                : formatStudyTime(totalStudyTime)
            }
            icon={Clock}
            iconColor="text-success"
            trend={studyTimeTrend}
            subtitle={
              isHistoryDisabled
                ? 'Enable history in settings'
                : totalStudyTime === 0
                  ? 'Keep studying!'
                  : undefined
            }
          />
          <StatCard
            title="Answered"
            value={isHistoryDisabled ? '-' : totalQuestionsAnswered}
            icon={CheckCircle}
            iconColor="text-orange-500"
            subtitle={
              isHistoryDisabled
                ? 'Enable history in settings'
                : totalQuestionsAnswered === 0
                  ? 'Ready to learn?'
                  : 'Questions completed'
            }
          />
        </div>

        {/* Recent Sessions */}
        {!isHistoryDisabled && recentSessions.length > 0 && (
          <RecentSessionsTable sessions={recentSessions} />
        )}
      </div>
    </div>
  )
}
