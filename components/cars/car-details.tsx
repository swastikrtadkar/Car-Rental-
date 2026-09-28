'use client'

import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowLeft,
  CalendarDays,
  Check,
  Fuel,
  Gauge,
  MapPin,
  Settings2,
  Snowflake,
  Star,
  Users,
} from 'lucide-react'
import { useStore } from '@/lib/store'
import { carName, formatDate, initials } from '@/lib/format'
import { BookingWidget } from './booking-widget'
import { CarCard } from './car-card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty'
import { AvailabilityBadge } from '@/components/shared/status-badge'
import { StarRating } from '@/components/shared/star-rating'

export function CarDetails({ id }: { id: string }) {
  const { cars, reviews, users } = useStore()
  const car = cars.find((c) => c.id === id)

  if (!car) {
    return (
      <Empty className="min-h-[60vh]">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <MapPin />
          </EmptyMedia>
          <EmptyTitle>Car not found</EmptyTitle>
          <EmptyDescription>This car may have been removed from our fleet.</EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button render={<Link href="/cars" />} nativeButton={false}>
            Browse all cars
          </Button>
        </EmptyContent>
      </Empty>
    )
  }

  const carReviews = reviews.filter((r) => r.carId === car.id)
  const similar = cars
    .filter((c) => c.id !== car.id && c.category === car.category)
    .slice(0, 3)

  const specs = [
    { icon: Users, label: 'Seats', value: `${car.seats} people` },
    { icon: Fuel, label: 'Fuel', value: car.fuelType },
    { icon: Settings2, label: 'Transmission', value: car.transmission },
    { icon: Gauge, label: car.fuelType === 'Electric' ? 'Range' : 'Mileage', value: car.mileage },
    { icon: CalendarDays, label: 'Year', value: String(car.year) },
    { icon: Snowflake, label: 'A/C', value: car.airConditioning ? 'Yes' : 'No' },
  ]

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Button variant="ghost" size="sm" render={<Link href="/cars" />} nativeButton={false} className="-ml-2">
        <ArrowLeft data-icon="inline-start" />
        Back to cars
      </Button>

      <div className="mt-4 grid gap-10 lg:grid-cols-[1fr_380px]">
        <div className="flex min-w-0 flex-col gap-8">
          <div className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-muted">
            <Image
              src={car.image || '/placeholder.svg'}
              alt={carName(car)}
              fill
              priority
              sizes="(min-width: 1024px) 60vw, 100vw"
              className="object-cover"
            />
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="secondary">{car.category}</Badge>
              <AvailabilityBadge status={car.availabilityStatus} />
            </div>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold tracking-tight md:text-4xl">{carName(car)}</h1>
                <p className="mt-1 flex items-center gap-1.5 text-muted-foreground">
                  <MapPin className="size-4" aria-hidden="true" /> {car.location}
                </p>
              </div>
              {car.reviewCount > 0 && (
                <div className="flex items-center gap-2">
                  <Star className="size-5 fill-warning text-warning" aria-hidden="true" />
                  <span className="text-lg font-semibold">{car.rating.toFixed(1)}</span>
                  <span className="text-sm text-muted-foreground">({car.reviewCount} reviews)</span>
                </div>
              )}
            </div>
            <p className="leading-relaxed text-pretty text-muted-foreground">{car.description}</p>
          </div>

          <section aria-labelledby="specs-heading" className="flex flex-col gap-4">
            <h2 id="specs-heading" className="text-xl font-semibold">Specifications</h2>
            <dl className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {specs.map((s) => (
                <div key={s.label} className="flex items-center gap-3 rounded-xl border bg-card p-4">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <s.icon className="size-5" aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <dt className="text-xs text-muted-foreground">{s.label}</dt>
                    <dd className="truncate font-medium">{s.value}</dd>
                  </div>
                </div>
              ))}
            </dl>
          </section>

          <section aria-labelledby="features-heading" className="flex flex-col gap-4">
            <h2 id="features-heading" className="text-xl font-semibold">Features</h2>
            <ul className="grid gap-2 sm:grid-cols-2">
              {car.features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm">
                  <span className="flex size-5 items-center justify-center rounded-full bg-success/15 text-success">
                    <Check className="size-3" aria-hidden="true" />
                  </span>
                  {f}
                </li>
              ))}
            </ul>
          </section>

          <div className="lg:hidden">
            <BookingWidget car={car} />
          </div>

          <Separator />

          <section aria-labelledby="reviews-heading" className="flex flex-col gap-4">
            <h2 id="reviews-heading" className="text-xl font-semibold">
              Customer reviews <span className="text-muted-foreground">({carReviews.length})</span>
            </h2>
            {carReviews.length === 0 ? (
              <p className="text-sm text-muted-foreground">No reviews yet. Be the first to rent and review this car.</p>
            ) : (
              <ul className="flex flex-col gap-4">
                {carReviews.map((r) => {
                  const user = users.find((u) => u.id === r.userId)
                  return (
                    <li key={r.id} className="flex gap-4 rounded-xl border bg-card p-4">
                      <Avatar>
                        <AvatarFallback className="bg-primary/10 text-xs font-semibold text-primary">
                          {initials(user?.name ?? 'Guest')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex min-w-0 flex-col gap-1">
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                          <p className="font-medium">{user?.name ?? 'Guest'}</p>
                          <StarRating rating={r.rating} />
                          <span className="text-xs text-muted-foreground">{formatDate(r.createdAt)}</span>
                        </div>
                        <p className="text-sm leading-relaxed text-muted-foreground">{r.comment}</p>
                      </div>
                    </li>
                  )
                })}
              </ul>
            )}
          </section>
        </div>

        <aside className="hidden lg:block" aria-label="Book this car">
          <BookingWidget car={car} />
        </aside>
      </div>

      {similar.length > 0 && (
        <section aria-labelledby="similar-heading" className="mt-16 flex flex-col gap-6">
          <h2 id="similar-heading" className="text-2xl font-bold">
            Similar {car.category} cars
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {similar.map((c) => (
              <CarCard key={c.id} car={c} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
