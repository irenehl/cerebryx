'use client'

import { usePathname, useRouter } from 'next/navigation'
import { Bell, Flame } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useAuth } from '@/providers/AuthProvider'
import { cn } from '@/lib/utils'

const getPageTitle = (pathname: string) => {
  if (pathname === '/dashboard') return 'Overview'
  if (pathname.startsWith('/study')) return 'Study'
  if (pathname.startsWith('/history')) return 'History'
  if (pathname.startsWith('/settings')) return 'Settings'
  return 'Dashboard'
}

export default function Navbar({ isCollapsed }: { isCollapsed: boolean }) {
  const pathname = usePathname()
  const router = useRouter()
  const { user, signOut } = useAuth()
  const isLandingPage = pathname === '/'

  if (isLandingPage) {
    return null // No navbar on landing page
  }

  const handleSignOut = async () => {
    await signOut()
    router.push('/')
  }

  return (
    <header
      className={cn(
        'fixed top-0 right-0 z-20 border-b bg-card flex-shrink-0 transition-[left] duration-300',
        isCollapsed
          ? 'left-16'
          : 'left-16 md:left-64'
      )}
    >
      <nav className="flex h-16 items-center justify-between px-6 w-full">
        <div className="flex items-center">
          <h1 className="text-lg font-semibold text-foreground">
            {getPageTitle(pathname)}
          </h1>
        </div>

        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-md">
            <Flame className="h-4 w-4 text-orange-500" />
            <span className="text-sm font-medium text-foreground">12 Day Streak</span>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger
              asChild
              className="!transition-none !duration-0"
            >
              <Button
                variant="ghost"
                size="sm"
                className="gap-2 !transition-none !duration-0 h-9"
              >
                {user?.user_metadata?.full_name || user?.user_metadata?.name || user?.email?.split('@')[0] || 'Account'}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>
                {user?.user_metadata?.full_name || user?.user_metadata?.name || user?.email || 'Guest User'}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => router.push('/settings')}>
                Settings
              </DropdownMenuItem>
              {user && (
                <DropdownMenuItem onClick={handleSignOut}>
                  Sign Out
                </DropdownMenuItem>
              )}
              {!user && (
                <DropdownMenuItem onClick={() => router.push('/auth')}>
                  Sign In
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
    </header>
  )
}
