import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import type { AvailabilityStatus, BookingStatus, PaymentStatus } from '@/lib/types'

type Tone = 'success' | 'warning' | 'info' | 'danger' | 'neutral'

const toneClass: Record<Tone, string> = {
  success: 'bg-success/12 text-success border-success/20',
  warning: 'bg-warning/20 text-warning-foreground border-warning/40',
  info: 'bg-primary/10 text-primary border-primary/20',
  danger: 'bg-destructive/10 text-destructive border-destructive/20',
  neutral: 'bg-muted text-muted-foreground border-border',
}

function ToneBadge({ tone, label, className }: { tone: Tone; label: string; className?: string }) {
  return (
    <Badge variant="outline" className={cn('capitalize', toneClass[tone], className)}>
      {label}
    </Badge>
  )
}

const bookingTone: Record<BookingStatus, Tone> = {
  pending: 'warning',
  confirmed: 'info',
  active: 'success',
  completed: 'neutral',
  cancelled: 'danger',
  rejected: 'danger',
}

const paymentTone: Record<PaymentStatus, Tone> = {
  paid: 'success',
  pending: 'warning',
  refunded: 'info',
  failed: 'danger',
}

const availabilityTone: Record<AvailabilityStatus, Tone> = {
  available: 'success',
  booked: 'info',
  maintenance: 'warning',
}

export function BookingStatusBadge({ status, className }: { status: BookingStatus; className?: string }) {
  return <ToneBadge tone={bookingTone[status]} label={status} className={className} />
}

export function PaymentStatusBadge({ status, className }: { status: PaymentStatus; className?: string }) {
  return <ToneBadge tone={paymentTone[status]} label={status} className={className} />
}

export function AvailabilityBadge({ status, className }: { status: AvailabilityStatus; className?: string }) {
  return <ToneBadge tone={availabilityTone[status]} label={status} className={className} />
}

export function ActiveBadge({ active }: { active: boolean }) {
  return <ToneBadge tone={active ? 'success' : 'neutral'} label={active ? 'Active' : 'Inactive'} />
}
