import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'

const STEPS = ['Choose car', 'Your details', 'Payment', 'Confirmed']

export function BookingSteps({ current }: { current: number }) {
  return (
    <ol className="flex items-center gap-2" aria-label="Booking progress">
      {STEPS.map((step, i) => {
        const done = i < current
        const active = i === current
        return (
          <li key={step} className="flex flex-1 items-center gap-2" aria-current={active ? 'step' : undefined}>
            <span
              className={cn(
                'flex size-7 shrink-0 items-center justify-center rounded-full border text-xs font-semibold',
                done && 'border-primary bg-primary text-primary-foreground',
                active && 'border-primary text-primary',
                !done && !active && 'text-muted-foreground',
              )}
            >
              {done ? <Check className="size-3.5" aria-hidden="true" /> : i + 1}
            </span>
            <span
              className={cn(
                'hidden text-sm font-medium sm:inline',
                active ? 'text-foreground' : 'text-muted-foreground',
              )}
            >
              {step}
            </span>
            {i < STEPS.length - 1 && (
              <span className={cn('h-px flex-1 bg-border', done && 'bg-primary')} aria-hidden="true" />
            )}
          </li>
        )
      })}
    </ol>
  )
}
