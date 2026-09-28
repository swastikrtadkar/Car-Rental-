import Image from 'next/image'
import Link from 'next/link'
import { Fuel, MapPin, Settings2, Star, Users } from 'lucide-react'
import type { Car } from '@/lib/types'
import { carName, formatCurrency } from '@/lib/format'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { AvailabilityBadge } from '@/components/shared/status-badge'

export function CarCard({ car, query = '' }: { car: Car; query?: string }) {
  const href = `/cars/${car.id}${query}`
  const unavailable = car.availabilityStatus !== 'available'

  return (
    <Card className="group gap-0 overflow-hidden p-0 transition-shadow hover:shadow-lg">
      <Link href={href} className="relative block aspect-[16/10] overflow-hidden bg-muted">
        <Image
          src={car.image || '/placeholder.svg'}
          alt={carName(car)}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3 flex gap-2">
          <Badge className="bg-background/90 text-foreground backdrop-blur">{car.category}</Badge>
        </div>
        {unavailable && (
          <div className="absolute top-3 right-3">
            <AvailabilityBadge status={car.availabilityStatus} className="bg-background/90" />
          </div>
        )}
      </Link>
      <CardContent className="flex flex-col gap-3 p-4">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className="truncate font-semibold">
              <Link href={href} className="hover:text-primary">
                {carName(car)}
              </Link>
            </h3>
            <p className="flex items-center gap-1 text-xs text-muted-foreground">
              <MapPin className="size-3" aria-hidden="true" />
              {car.location} · {car.year}
            </p>
          </div>
          {car.reviewCount > 0 && (
            <span className="flex shrink-0 items-center gap-1 text-sm font-medium">
              <Star className="size-4 fill-warning text-warning" aria-hidden="true" />
              {car.rating.toFixed(1)}
              <span className="sr-only">rating</span>
            </span>
          )}
        </div>
        <ul className="grid grid-cols-3 gap-2 text-xs text-muted-foreground">
          <li className="flex items-center gap-1.5">
            <Users className="size-3.5" aria-hidden="true" />
            {car.seats} seats
          </li>
          <li className="flex items-center gap-1.5">
            <Fuel className="size-3.5" aria-hidden="true" />
            {car.fuelType}
          </li>
          <li className="flex items-center gap-1.5">
            <Settings2 className="size-3.5" aria-hidden="true" />
            {car.transmission === 'Automatic' ? 'Auto' : 'Manual'}
          </li>
        </ul>
      </CardContent>
      <CardFooter className="flex items-center justify-between border-t p-4">
        <p>
          <span className="text-lg font-bold">{formatCurrency(car.pricePerDay)}</span>
          <span className="text-sm text-muted-foreground">/day</span>
        </p>
        <Button render={<Link href={href} />} nativeButton={false} variant={unavailable ? 'outline' : 'default'}>
          {unavailable ? 'View details' : 'Book now'}
        </Button>
      </CardFooter>
    </Card>
  )
}
