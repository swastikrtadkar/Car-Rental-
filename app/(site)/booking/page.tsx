import type { Metadata } from 'next'
import { RequireAuth } from '@/components/shared/require-auth'
import { BookingDetailsForm } from '@/components/booking/booking-details-form'

export const metadata: Metadata = { title: 'Booking details' }

export default function BookingPage() {
  return (
    <RequireAuth role="customer">
      <BookingDetailsForm />
    </RequireAuth>
  )
}
