'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  BookOpen,
  Settings,
  LayoutDashboard,
  History,
  BarChart3,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { useWindow } from '@/hooks/use-window'
import { useAuth } from '@/providers/AuthProvider'
import CerebryxLogo from '@/components/branding/CerebryxLogo'

export default function Sidebar({
  isCollapsed,
  toggleSidebar,
  ref,
}: {
  isCollapsed: boolean
  toggleSidebar: () => void
  ref: React.RefObject<HTMLElement>
}) {
  const { width } = useWindow()
  const isMobile = width < 768
  const pathname = usePathname()
  const { user } = useAuth()

  const isActive = (path: string) => {
    if (path === '/dashboard') {
      return pathname === '/dashboard'
    }
    return pathname?.startsWith(path)
  }

  const menuItems = [
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/study', label: 'Start Study', icon: BookOpen },
    { href: '/history', label: 'History', icon: History },
    { href: '/settings', label: 'Analytics', icon: BarChart3 },
  ]

  const getUserInitials = () => {
    const name = user?.user_metadata?.full_name || user?.user_metadata?.name || user?.email?.split('@')[0] || 'U'
    const parts = name.split(' ')
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
    }
    return name.substring(0, 2).toUpperCase()
  }

  const getUserDisplayName = () => {
    return user?.user_metadata?.full_name || user?.user_metadata?.name || user?.email?.split('@')[0] || 'User'
  }

  return (
    <>
      {/* Toggle Button */}
      <div
        className={cn(
          'flex items-center fixed top-0 left-0 z-20 h-16 border-b md:border-b-0 md:border-r bg-card transition-[width] duration-300',
          isCollapsed ? 'w-16' : 'w-64'
        )}
      >
        <div className="flex items-center justify-between w-full px-4">
          {!isCollapsed ? (
            <div className="flex items-center gap-2 flex-1">
              <CerebryxLogo className="h-6 w-6" />
              <span className="text-xl font-bold text-foreground">CEREBRYX</span>
            </div>
          ) : (
            <div className="flex-1" />
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="h-8 w-8"
            aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {isCollapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
      <aside
        className={cn(
          'fixed left-0 top-16 z-20 h-[calc(100vh-4rem)] border-t md:border-t-0 md:border-r bg-card overflow-y-auto transition-[width] duration-300 overflow-x-hidden flex flex-col',
          isCollapsed ? 'w-0 md:w-16' : 'w-0 md:w-64'
        )}
      >
        {/* Navigation */}
        <nav
          ref={ref}
          className={cn(
            'flex-1 flex md:static fixed z-11 top-16 border-t md:top-0 w-full md:w-auto bg-card transition-[transform,width] duration-300 md:transition-none md:duration-0',
            isCollapsed
              ? '-translate-x-full md:-translate-x-0'
              : 'translate-x-0'
          )}
        >
          <div className="flex flex-col h-full">
            <div className="flex-1 px-3 py-4 space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon
                const active = isActive(item.href)
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="w-full"
                    onClick={() => {
                      if (isMobile) {
                        toggleSidebar()
                      }
                    }}
                  >
                    <Button
                      variant="ghost"
                      className={cn(
                        'gap-3 !justify-start !px-3 w-full h-10',
                        isCollapsed && '!px-2 !justify-center',
                        active && 'bg-secondary text-secondary-foreground font-semibold'
                      )}
                      title={isCollapsed ? item.label : undefined}
                    >
                      <Icon className="h-5 w-5 flex-shrink-0" />
                      {!isCollapsed && (
                        <span className="text-sm">{item.label}</span>
                      )}
                    </Button>
                  </Link>
                )
              })}
            </div>

            {/* User Profile Section */}
            {!isCollapsed && (
              <div className="border-t border-border p-3 mt-auto">
                <div className="flex items-center gap-3 px-2 py-2">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-secondary text-secondary-foreground">
                      {getUserInitials()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      {getUserDisplayName()}
                    </p>
                    <p className="text-xs text-muted-foreground">Pro Plan</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    aria-label="More options"
                  >
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        </nav>
      </aside>
    </>
  )
}
