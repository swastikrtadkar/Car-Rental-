'use client'

import Link from 'next/link'
import { CalendarDays, CarFront, MapPin, ArrowRight } from 'lucide-react'
import { useStore } from '@/lib/store'
import { carName, formatCurrency, formatDate } from '@/lib/format'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

function statusVariant(status: string) {
  if (status === 'confirmed' || status === 'active' || status === 'completed') return 'default'
  if (status === 'cancelled' || status === 'rejected') return 'destructive'
  return 'secondary'
}

export default function MyBookingsPage() {
  const { currentUser, bookings, cars } = useStore()

  if (!currentUser) {
    return (
      <section className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6">
        <h1 className="text-3xl font-bold">Sign in to view your bookings</h1>
        <p className="mt-3 text-muted-foreground">
          Your reservations will appear here after you sign in.
        </p>
        <Button className="mt-6" render={<Link href="/login" />} nativeButton={false}>
          Sign in
        </Button>
      </section>
    )
  }

  const myBookings = bookings.filter((booking) => booking.userId === currentUser.id)

  return (
    <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <p className="text-sm font-semibold text-primary">MY BOOKINGS</p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight">Your reservations</h1>
        <p className="mt-2 text-muted-foreground">
          View your current and previous DriveEasy bookings.
        </p>
      </div>

      {myBookings.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16 text-center">
            <div className="flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary">
              <CarFront className="size-7" />
            </div>
            <h2 className="mt-5 text-xl font-semibold">No bookings yet</h2>
            <p className="mt-2 max-w-md text-sm text-muted-foreground">
              Browse our available cars and make your first reservation.
            </p>
            <Button className="mt-6" render={<Link href="/cars" />} nativeButton={false}>
              Browse Cars
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-5">
          {myBookings.map((booking) => {
            const car = cars.find((item) => item.id === booking.carId)

            return (
              <Card key={booking.id} className="overflow-hidden">
                <CardHeader className="flex flex-row items-start justify-between gap-4">
                  <div>
                    <CardTitle className="text-xl">{car ? carName(car) : 'Car unavailable'}</CardTitle>
                    <p className="mt-1 text-sm text-muted-foreground">Booking ID: {booking.id}</p>
                  </div>
                  <Badge variant={statusVariant(booking.bookingStatus) as any}>
                    {booking.bookingStatus}
                  </Badge>
                </CardHeader>

                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="rounded-lg border p-4">
                      <div className="flex items-center gap-2 text-sm font-medium">
                        <CalendarDays className="size-4 text-primary" />
                        Pickup
                      </div>
                      <p className="mt-2 font-medium">{formatDate(booking.pickupDate)}</p>
                      <p className="text-sm text-muted-foreground">{booking.pickupTime}</p>
                    </div>

                    <div className="rounded-lg border p-4">
                      <div className="flex items-center gap-2 text-sm font-medium">
                        <CalendarDays className="size-4 text-primary" />
                        Return
                      </div>
                      <p className="mt-2 font-medium">{formatDate(booking.returnDate)}</p>
                      <p className="text-sm text-muted-foreground">{booking.returnTime}</p>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-col gap-3 rounded-lg border p-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-start gap-2">
                      <MapPin className="mt-0.5 size-4 text-primary" />
                      <div>
                        <p className="text-sm font-medium">{booking.pickupLocation}</p>
                        <p className="text-xs text-muted-foreground">to {booking.returnLocation}</p>
                      </div>
                    </div>
                    <div className="text-left sm:text-right">
                      <p className="text-xs text-muted-foreground">Total amount</p>
                      <p className="text-lg font-bold">{formatCurrency(booking.totalAmount)}</p>
                    </div>
                  </div>

                  <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                    <div className="text-sm text-muted-foreground">
                      Payment: <span className="font-medium capitalize">{booking.paymentStatus}</span>
                    </div>
                    <Button variant="outline" render={<Link href="/cars" />} nativeButton={false}>
                      Browse more cars
                      <ArrowRight />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}
    </section>
  )
}
