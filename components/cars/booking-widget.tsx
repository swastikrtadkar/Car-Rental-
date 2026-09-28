'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { AlertCircle, CalendarCheck } from 'lucide-react'
import { useStore } from '@/lib/store'
import { LOCATIONS } from '@/lib/mock-data'
import { addDaysISO, calculatePrice, formatCurrency, hasConflict, todayISO } from '@/lib/format'
import type { Car } from '@/lib/types'
import { PriceSummary } from '@/components/booking/price-summary'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

function LocationSelect({ id, value, onChange }: { id: string; value: string; onChange: (v: string) => void }) {
  return (
    <Select value={value} onValueChange={(v) => onChange((v as string) ?? value)}>
      <SelectTrigger id={id} className="w-full">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {LOCATIONS.map((l) => (
            <SelectItem key={l} value={l}>
              {l}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export function BookingWidget({ car }: { car: Car }) {
  const router = useRouter()
  const params = useSearchParams()
  const { bookings, settings, currentUser, setDraft } = useStore()
  const today = todayISO()

  const [pickupDate, setPickupDate] = useState(params.get('pickup') ?? addDaysISO(today, 1))
  const [returnDate, setReturnDate] = useState(params.get('return') ?? addDaysISO(today, 4))
  const [pickupTime, setPickupTime] = useState('10:00')
  const [returnTime, setReturnTime] = useState('10:00')
  const [pickupLocation, setPickupLocation] = useState(car.location)
  const [returnLocation, setReturnLocation] = useState(car.location)

  const price = calculatePrice(car, pickupDate, returnDate, settings)
  const invalidRange = returnDate <= pickupDate
  const pastDate = pickupDate < today
  const conflict = !invalidRange && hasConflict(bookings, car.id, pickupDate, returnDate)
  const unavailable = car.availabilityStatus !== 'available'
  const isAdmin = currentUser?.role === 'admin'
  const canBook = !invalidRange && !pastDate && !conflict && !unavailable && !isAdmin

  function handleBook() {
    if (!canBook) return
    setDraft({
      carId: car.id,
      pickupDate,
      returnDate,
      pickupTime,
      returnTime,
      pickupLocation,
      returnLocation,
      customer: {
        name: currentUser?.name ?? '',
        email: currentUser?.email ?? '',
        phone: currentUser?.phone ?? '',
        licenseNumber: '',
        address: currentUser?.address ?? '',
      },
    })
    router.push(currentUser ? '/booking' : '/login?redirect=/booking')
  }

  return (
    <Card className="lg:sticky lg:top-24">
      <CardHeader>
        <CardTitle className="flex items-baseline gap-1">
          <span className="text-2xl font-bold">{formatCurrency(car.pricePerDay)}</span>
          <span className="text-sm font-normal text-muted-foreground">/ day</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        <FieldGroup className="gap-4">
          <div className="grid grid-cols-2 gap-3">
            <Field>
              <FieldLabel htmlFor="bw-pickup">Pickup date</FieldLabel>
              <Input
                id="bw-pickup"
                type="date"
                min={today}
                value={pickupDate}
                onChange={(e) => {
                  setPickupDate(e.target.value)
                  if (returnDate <= e.target.value) setReturnDate(addDaysISO(e.target.value, 1))
                }}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="bw-pickup-time">Time</FieldLabel>
              <Input id="bw-pickup-time" type="time" value={pickupTime} onChange={(e) => setPickupTime(e.target.value)} />
            </Field>
            <Field data-invalid={invalidRange || undefined}>
              <FieldLabel htmlFor="bw-return">Return date</FieldLabel>
              <Input
                id="bw-return"
                type="date"
                min={addDaysISO(pickupDate, 1)}
                value={returnDate}
                aria-invalid={invalidRange || undefined}
                onChange={(e) => setReturnDate(e.target.value)}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="bw-return-time">Time</FieldLabel>
              <Input id="bw-return-time" type="time" value={returnTime} onChange={(e) => setReturnTime(e.target.value)} />
            </Field>
          </div>
          <Field>
            <FieldLabel htmlFor="bw-pickup-loc">Pickup location</FieldLabel>
            <LocationSelect id="bw-pickup-loc" value={pickupLocation} onChange={setPickupLocation} />
          </Field>
          <Field>
            <FieldLabel htmlFor="bw-return-loc">Return location</FieldLabel>
            <LocationSelect id="bw-return-loc" value={returnLocation} onChange={setReturnLocation} />
          </Field>
        </FieldGroup>

        {unavailable ? (
          <Alert variant="destructive">
            <AlertCircle />
            <AlertTitle>Currently unavailable</AlertTitle>
            <AlertDescription>
              This car is {car.availabilityStatus === 'maintenance' ? 'under maintenance' : 'already booked'}. Please pick another car.
            </AlertDescription>
          </Alert>
        ) : invalidRange ? (
          <Alert variant="destructive">
            <AlertCircle />
            <AlertTitle>Invalid dates</AlertTitle>
            <AlertDescription>Return date must be after the pickup date.</AlertDescription>
          </Alert>
        ) : pastDate ? (
          <Alert variant="destructive">
            <AlertCircle />
            <AlertTitle>Invalid pickup date</AlertTitle>
            <AlertDescription>Pickup date cannot be in the past.</AlertDescription>
          </Alert>
        ) : conflict ? (
          <Alert variant="destructive">
            <AlertCircle />
            <AlertTitle>Already booked</AlertTitle>
            <AlertDescription>This car is booked for part of these dates. Try different dates.</AlertDescription>
          </Alert>
        ) : (
          <div className="rounded-lg bg-muted/60 p-4">
            <PriceSummary price={price} taxRate={settings.taxRate} />
          </div>
        )}
      </CardContent>
      <CardFooter className="flex flex-col gap-2">
        <Button size="lg" className="w-full" disabled={!canBook} onClick={handleBook}>
          <CalendarCheck data-icon="inline-start" />
          {currentUser ? 'Book this car' : 'Sign in to book'}
        </Button>
        <p className="text-center text-xs text-muted-foreground">
          {isAdmin ? 'Admins cannot place bookings. Sign in as a customer.' : 'Free cancellation up to 24 hours before pickup.'}
        </p>
      </CardFooter>
    </Card>
  )
}
