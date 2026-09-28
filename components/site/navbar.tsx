'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import { CalendarCheck, LayoutDashboard, LogOut, Menu, UserRound } from 'lucide-react'
import { toast } from 'sonner'
import { useStore } from '@/lib/store'
import { initials } from '@/lib/format'
import { cn } from '@/lib/utils'
import { Logo } from './logo'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Separator } from '@/components/ui/separator'

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/cars', label: 'Browse Cars' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const { currentUser, logout } = useStore()
  const [mobileOpen, setMobileOpen] = useState(false)

  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href))

  function handleLogout() {
    logout()
    toast.success('You have been signed out.')
    router.push('/')
  }

  return (
    <header className="sticky top-0 z-40 border-b bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Logo />

        <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground',
                isActive(link.href) && 'text-foreground',
              )}
              aria-current={isActive(link.href) ? 'page' : undefined}
            >
              {link.label}
            </Link>
          ))}
          {currentUser?.role === 'customer' && (
            <Link
              href="/my-bookings"
              className={cn(
                'rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground',
                isActive('/my-bookings') && 'text-foreground',
              )}
            >
              My Bookings
            </Link>
          )}
        </nav>

        <div className="flex items-center gap-2">
          {currentUser ? (
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <Button variant="ghost" className="h-10 gap-2 px-2" aria-label="Account menu" />
                }
              >
                <Avatar className="size-8">
                  <AvatarFallback className="bg-primary/10 text-xs font-semibold text-primary">
                    {initials(currentUser.name)}
                  </AvatarFallback>
                </Avatar>
                <span className="hidden text-sm font-medium lg:inline">
                  {currentUser.name.split(' ')[0]}
                </span>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuGroup>
                  <DropdownMenuLabel>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-foreground">{currentUser.name}</span>
                      <span className="text-xs text-muted-foreground">{currentUser.email}</span>
                    </div>
                  </DropdownMenuLabel>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  {currentUser.role === 'admin' ? (
                    <DropdownMenuItem onClick={() => router.push('/admin')}>
                      <LayoutDashboard />
                      Admin Dashboard
                    </DropdownMenuItem>
                  ) : (
                    <>
                      <DropdownMenuItem onClick={() => router.push('/my-bookings')}>
                        <CalendarCheck />
                        My Bookings
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => router.push('/profile')}>
                        <UserRound />
                        Profile
                      </DropdownMenuItem>
                    </>
                  )}
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem variant="destructive" onClick={handleLogout}>
                    <LogOut />
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="hidden items-center gap-2 sm:flex">
              <Button variant="ghost" render={<Link href="/login" />} nativeButton={false}>
                Sign in
              </Button>
              <Button render={<Link href="/register" />} nativeButton={false}>
                Get started
              </Button>
            </div>
          )}

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger
              render={<Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu" />}
            >
              <Menu />
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <SheetHeader>
                <SheetTitle>
                  <Logo />
                </SheetTitle>
              </SheetHeader>
              <nav aria-label="Mobile" className="flex flex-col gap-1 px-4">
                {[...NAV_LINKS, ...(currentUser?.role === 'customer' ? [{ href: '/my-bookings', label: 'My Bookings' }, { href: '/profile', label: 'Profile' }] : []), ...(currentUser?.role === 'admin' ? [{ href: '/admin', label: 'Admin Dashboard' }] : [])].map(
                  (link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        'rounded-md px-3 py-2.5 text-sm font-medium hover:bg-muted',
                        isActive(link.href) && 'bg-muted text-primary',
                      )}
                    >
                      {link.label}
                    </Link>
                  ),
                )}
                {!currentUser && (
                  <>
                    <Separator className="my-3" />
                    <Button render={<Link href="/login" onClick={() => setMobileOpen(false)} />} nativeButton={false} variant="outline">
                      Sign in
                    </Button>
                    <Button render={<Link href="/register" onClick={() => setMobileOpen(false)} />} nativeButton={false} className="mt-2">
                      Get started
                    </Button>
                  </>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
