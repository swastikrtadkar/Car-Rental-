import { Star } from 'lucide-react'
import { cn } from '@/lib/utils'

export function StarRating({ rating, className }: { rating: number; className?: string }) {
  return (
    <div className={cn('flex items-center gap-0.5', className)} aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          aria-hidden="true"
          className={cn(
            'size-4',
            i < Math.round(rating) ? 'fill-warning text-warning' : 'fill-muted text-muted',
          )}
        />
      ))}
    </div>
  )
}
