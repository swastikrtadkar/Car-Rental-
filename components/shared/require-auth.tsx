'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LockKeyhole, ShieldAlert } from 'lucide-react'
import { useStore } from '@/lib/store'
import type { Role } from '@/lib/types'
import { Button } from '@/components/ui/button'
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty'

export function RequireAuth({ role, children }: { role?: Role; children: React.ReactNode }) {
  const { currentUser } = useStore()
  const pathname = usePathname()
  const loginHref = `/login?redirect=${encodeURIComponent(pathname)}`

  if (!currentUser) {
    return (
      <Empty className="min-h-[60vh]">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <LockKeyhole />
          </EmptyMedia>
          <EmptyTitle>Please sign in to continue</EmptyTitle>
          <EmptyDescription>
            {role === 'admin'
              ? 'The admin dashboard is only available to administrators.'
              : 'You need an account to view this page and manage your bookings.'}
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent className="flex-row justify-center">
          <Button render={<Link href={loginHref} />} nativeButton={false}>
            Sign in
          </Button>
          {role !== 'admin' && (
            <Button variant="outline" render={<Link href="/register" />} nativeButton={false}>
              Create account
            </Button>
          )}
        </EmptyContent>
      </Empty>
    )
  }

  if (role && currentUser.role !== role) {
    return (
      <Empty className="min-h-[60vh]">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <ShieldAlert />
          </EmptyMedia>
          <EmptyTitle>Access restricted</EmptyTitle>
          <EmptyDescription>
            Your account ({currentUser.email}) does not have permission to view this page.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button render={<Link href="/" />} nativeButton={false}>
            Back to home
          </Button>
        </EmptyContent>
      </Empty>
    )
  }

  return <>{children}</>
}
