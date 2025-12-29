'use client'

import Link from 'next/link'
import { FileText, FileEdit, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { HistoryEntry } from '@/types/history'
import { cn, formatStudyTime } from '@/lib/utils'

interface RecentSessionsTableProps {
  sessions: HistoryEntry[]
}

const formatRelativeTime = (isoString: string) => {
  const date = new Date(isoString)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)

  if (diffMins < 60) {
    return `${diffMins} ${diffMins === 1 ? 'minute' : 'minutes'} ago`
  }
  if (diffHours < 24) {
    return `${diffHours} ${diffHours === 1 ? 'hour' : 'hours'} ago`
  }
  if (diffDays === 1) {
    return 'Yesterday'
  }
  if (diffDays < 7) {
    return `${diffDays} days ago`
  }
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  })
}

const getScoreColor = (percentage: number) => {
  if (percentage >= 80) return 'bg-success'
  if (percentage >= 60) return 'bg-orange-500'
  return 'bg-destructive'
}

export default function RecentSessionsTable({
  sessions,
}: RecentSessionsTableProps) {
  if (sessions.length === 0) {
    return null
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-foreground">Recent Sessions</h2>
        <Link href="/history">
          <Button variant="ghost" size="sm" className="text-primary">
            View All
          </Button>
        </Link>
      </div>

      <div className="border border-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                  Topic
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                  Type
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                  Date
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                  Score
                </th>
                <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {sessions.map((entry) => {
                const sourceType =
                  entry.source.type === 'pdf' ? 'PDF Upload' : 'Text Input'
                const sourceIcon =
                  entry.source.type === 'pdf' ? FileText : FileEdit
                const SourceIcon = sourceIcon
                const badgeColor =
                  entry.source.type === 'pdf' ? 'bg-primary' : 'bg-secondary'

                // Get topic name - for now use a generic name based on type
                const topicName =
                  entry.source.type === 'pdf'
                    ? `PDF Document`
                    : `Text Input`

                return (
                  <tr
                    key={entry.id}
                    className="border-b border-border hover:bg-muted/30 transition-colors"
                  >
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <SourceIcon className="h-5 w-5 text-muted-foreground" />
                        <span className="text-sm font-medium text-foreground">
                          {topicName}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <Badge
                        className={cn(
                          badgeColor,
                          'text-white border-0 !transition-none !duration-0'
                        )}
                      >
                        {sourceType}
                      </Badge>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-sm text-muted-foreground">
                        {formatRelativeTime(entry.timestamp)}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2 min-w-[120px]">
                        <Progress
                          value={entry.quiz.percentage}
                          className={cn(
                            'h-2 flex-1',
                            entry.quiz.percentage >= 80
                              ? '[&>div]:bg-success'
                              : entry.quiz.percentage >= 60
                                ? '[&>div]:bg-orange-500'
                                : '[&>div]:bg-destructive'
                          )}
                        />
                        <span
                          className={cn(
                            'text-sm font-medium min-w-[40px]',
                            entry.quiz.percentage >= 80
                              ? 'text-success'
                              : entry.quiz.percentage >= 60
                                ? 'text-orange-500'
                                : 'text-destructive'
                          )}
                        >
                          {entry.quiz.percentage}%
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        aria-label="View session details"
                      >
                        <ArrowRight className="h-4 w-4 text-muted-foreground" />
                      </Button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

