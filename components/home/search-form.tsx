'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Search } from 'lucide-react'
import { LOCATIONS } from '@/lib/mock-data'
import { addDaysISO, todayISO } from '@/lib/format'
import { Button } from '@/components/ui/button'
import { Field, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export function SearchForm() {
  const router = useRouter()
  const today = todayISO()
  const [location, setLocation] = useState<string>('Mumbai')
  const [pickup, setPickup] = useState(addDaysISO(today, 1))
  const [dropoff, setDropoff] = useState(addDaysISO(today, 4))
  const [error, setError] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (dropoff <= pickup) {
      setError('Return date must be after pickup date.')
      return
    }
    setError('')
    const params = new URLSearchParams({ location, pickup, return: dropoff })
    router.push(`/cars?${params.toString()}`)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-4 rounded-2xl border bg-card p-4 shadow-xl shadow-primary/5 sm:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1fr_auto] lg:items-end lg:p-5"
      aria-label="Search available cars"
    >
      <Field>
        <FieldLabel htmlFor="search-location">Pickup location</FieldLabel>
        <Select value={location} onValueChange={(v) => setLocation(v ?? 'Mumbai')}>
          <SelectTrigger id="search-location" className="h-10 w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {LOCATIONS.map((loc) => (
                <SelectItem key={loc} value={loc}>
                  {loc}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </Field>
      <Field>
        <FieldLabel htmlFor="search-pickup">Pickup date</FieldLabel>
        <Input
          id="search-pickup"
          type="date"
          className="h-10"
          min={today}
          value={pickup}
          onChange={(e) => {
            setPickup(e.target.value)
            if (dropoff <= e.target.value) setDropoff(addDaysISO(e.target.value, 1))
          }}
        />
      </Field>
      <Field data-invalid={error ? true : undefined}>
        <FieldLabel htmlFor="search-return">Return date</FieldLabel>
        <Input
          id="search-return"
          type="date"
          className="h-10"
          min={addDaysISO(pickup, 1)}
          value={dropoff}
          aria-invalid={error ? true : undefined}
          onChange={(e) => setDropoff(e.target.value)}
        />
      </Field>
      <Button type="submit" size="lg" className="h-10 px-6 sm:col-span-2 lg:col-span-1">
        <Search data-icon="inline-start" />
        Search cars
      </Button>
      {error && (
        <p role="alert" className="text-sm text-destructive sm:col-span-2 lg:col-span-4">
          {error}
        </p>
      )}
    </form>
  )
}
