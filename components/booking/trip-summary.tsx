'use client'

import Image from 'next/image'
import { CalendarDays, MapPin } from 'lucide-react'
import { useStore } from '@/lib/store'
import type { BookingDraft } from '@/lib/types'
import { calculatePrice, carName, formatDate } from '@/lib/format'
import { PriceSummary } from './price-summary'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

export function TripSummary({ draft }: { draft: BookingDraft }) {
  const { cars, settings } = useStore()
  const car = cars.find((c) => c.id === draft.carId)
  const price = calculatePrice(car, draft.pickupDate, draft.returnDate, settings)

  return (
    <Card className="lg:sticky lg:top-24">
      <CardHeader>
        <CardTitle>Trip summary</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        {car && (
          <div className="flex items-center gap-4">
            <div className="relative aspect-[4/3] w-28 shrink-0 overflow-hidden rounded-lg bg-muted">
              <Image src={car.image || '/placeholder.svg'} alt={carName(car)} fill sizes="112px" className="object-cover" />
            </div>
            <div className="min-w-0">
              <p className="truncate font-semibold">{carName(car)}</p>
              <p className="text-sm text-muted-foreground">
                {car.category} · {car.transmission} · {car.fuelType}
              </p>
            </div>
          </div>
        )}
        <Separator />
        <dl className="grid gap-3 text-sm">
          <div className="flex gap-3">
            <CalendarDays className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
            <div>
              <dt className="text-muted-foreground">Pickup</dt>
              <dd className="font-medium">
                {formatDate(draft.pickupDate)}, {draft.pickupTime}
              </dd>
            </div>
          </div>
          <div className="flex gap-3">
            <CalendarDays className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
            <div>
              <dt className="text-muted-foreground">Return</dt>
              <dd className="font-medium">
                {formatDate(draft.returnDate)}, {draft.returnTime}
              </dd>
            </div>
          </div>
          <div className="flex gap-3">
            <MapPin className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
            <div>
              <dt className="text-muted-foreground">Locations</dt>
              <dd className="font-medium">
                {draft.pickupLocation}
                {draft.returnLocation !== draft.pickupLocation && ` → ${draft.returnLocation}`}
              </dd>
            </div>
          </div>
        </dl>
        <Separator />
        <PriceSummary price={price} taxRate={settings.taxRate} />
      </CardContent>
    </Card>
  )
}
