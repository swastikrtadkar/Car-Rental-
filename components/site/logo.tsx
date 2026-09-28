import Link from 'next/link'
import { CarFront } from 'lucide-react'
import { cn } from '@/lib/utils'

export function Logo({ className, href = '/' }: { className?: string; href?: string }) {
  return (
    <Link href={href} className={cn('flex items-center gap-2 font-bold tracking-tight', className)}>
      <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
        <CarFront className="size-5" aria-hidden="true" />
      </span>
      <span className="text-lg">
        Drive<span className="text-primary">Easy</span>
      </span>
    </Link>
  )
}
