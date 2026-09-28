'use client'

import { useSearchParams } from 'next/navigation'
import { useMemo, useState } from 'react'
import { CalendarDays, CarFront, Search, SlidersHorizontal, X } from 'lucide-react'
import { useStore } from '@/lib/store'
import { formatDate, hasConflict } from '@/lib/format'
import { CarCard } from './car-card'
import { CarFilters, defaultFilters, type Filters } from './car-filters'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty'
import { SimplePagination, usePagination } from '@/components/shared/simple-pagination'

const SORTS = [
  { value: 'recommended', label: 'Recommended' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Top rated' },
  { value: 'newest', label: 'Newest models' },
]

export function CarBrowser() {
  const params = useSearchParams()
  const { cars, bookings } = useStore()
  const pickup = params.get('pickup') ?? ''
  const dropoff = params.get('return') ?? ''
  const hasDates = Boolean(pickup && dropoff)

  const [query, setQuery] = useState('')
  const [sort, setSort] = useState('recommended')
  const [filters, setFilters] = useState<Filters>(() => ({
    ...defaultFilters,
    location: params.get('location') ?? 'all',
    categories: params.get('category') ? [params.get('category') as string] : [],
  }))

  const update = (patch: Partial<Filters>) => setFilters((f) => ({ ...f, ...patch }))
  const reset = () => {
    setFilters(defaultFilters)
    setQuery('')
  }

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    const list = cars.filter((car) => {
      if (q && !`${car.brand} ${car.model} ${car.category}`.toLowerCase().includes(q)) return false
      if (filters.location !== 'all' && car.location !== filters.location) return false
      if (filters.brand !== 'all' && car.brand !== filters.brand) return false
      if (filters.transmission !== 'all' && car.transmission !== filters.transmission) return false
      if (filters.seats !== 'all' && car.seats < Number(filters.seats)) return false
      if (filters.categories.length && !filters.categories.includes(car.category)) return false
      if (filters.fuels.length && !filters.fuels.includes(car.fuelType)) return false
      if (car.pricePerDay < filters.price[0] || car.pricePerDay > filters.price[1]) return false
      if (filters.availableOnly && car.availabilityStatus !== 'available') return false
      if (hasDates && hasConflict(bookings, car.id, pickup, dropoff)) return false
      return true
    })
    const sorted = [...list]
    switch (sort) {
      case 'price-asc':
        sorted.sort((a, b) => a.pricePerDay - b.pricePerDay)
        break
      case 'price-desc':
        sorted.sort((a, b) => b.pricePerDay - a.pricePerDay)
        break
      case 'rating':
        sorted.sort((a, b) => b.rating - a.rating)
        break
      case 'newest':
        sorted.sort((a, b) => b.year - a.year)
        break
      default:
        sorted.sort(
          (a, b) =>
            Number(b.availabilityStatus === 'available') - Number(a.availabilityStatus === 'available') ||
            b.rating - a.rating,
        )
    }
    return sorted
  }, [cars, bookings, query, filters, sort, hasDates, pickup, dropoff])

  const pagination = usePagination(results, 9)
  const dateQuery = hasDates ? `?pickup=${pickup}&return=${dropoff}` : ''

  const activeChips = [
    filters.location !== 'all' && { key: 'location', label: filters.location, clear: () => update({ location: 'all' }) },
    filters.brand !== 'all' && { key: 'brand', label: filters.brand, clear: () => update({ brand: 'all' }) },
    ...filters.categories.map((c) => ({
      key: `cat-${c}`,
      label: c,
      clear: () => update({ categories: filters.categories.filter((x) => x !== c) }),
    })),
    ...filters.fuels.map((f) => ({
      key: `fuel-${f}`,
      label: f,
      clear: () => update({ fuels: filters.fuels.filter((x) => x !== f) }),
    })),
  ].filter(Boolean) as { key: string; label: string; clear: () => void }[]

  const filterPanel = <CarFilters filters={filters} onChange={update} onReset={reset} />

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Browse cars</h1>
        <p className="text-muted-foreground">
          {hasDates ? (
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays className="size-4" aria-hidden="true" />
              Showing cars available {formatDate(pickup)} – {formatDate(dropoff)}
            </span>
          ) : (
            'Find the perfect car from our fleet of hatchbacks, sedans, SUVs, EVs and luxury models.'
          )}
        </p>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[280px_1fr]">
        <aside className="hidden lg:block" aria-label="Filters">
          <div className="sticky top-24 rounded-xl border bg-card p-5">{filterPanel}</div>
        </aside>

        <div className="flex min-w-0 flex-col gap-6">
          <div className="flex flex-col gap-3 sm:flex-row">
            <InputGroup className="h-10 flex-1 bg-card">
              <InputGroupInput
                placeholder="Search by brand, model or type..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                aria-label="Search cars"
              />
              <InputGroupAddon>
                <Search />
              </InputGroupAddon>
            </InputGroup>
            <div className="flex gap-3">
              <Sheet>
                <SheetTrigger render={<Button variant="outline" className="h-10 lg:hidden" />}>
                  <SlidersHorizontal data-icon="inline-start" />
                  Filters
                </SheetTrigger>
                <SheetContent side="left" className="w-80 overflow-y-auto">
                  <SheetHeader>
                    <SheetTitle className="sr-only">Filter cars</SheetTitle>
                  </SheetHeader>
                  <div className="px-4 pb-6">{filterPanel}</div>
                </SheetContent>
              </Sheet>
              <Select items={SORTS} value={sort} onValueChange={(v) => setSort((v as string) ?? 'recommended')}>
                <SelectTrigger className="h-10 w-full bg-card sm:w-48" aria-label="Sort cars">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {SORTS.map((s) => (
                      <SelectItem key={s.value} value={s.value}>
                        {s.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">{results.length}</span> cars found
            </p>
            {activeChips.map((chip) => (
              <Badge key={chip.key} variant="secondary" className="gap-1 pr-1">
                {chip.label}
                <button
                  type="button"
                  onClick={chip.clear}
                  className="rounded-full p-0.5 hover:bg-background"
                  aria-label={`Remove ${chip.label} filter`}
                >
                  <X className="size-3" />
                </button>
              </Badge>
            ))}
          </div>

          {results.length === 0 ? (
            <Empty className="rounded-xl border border-dashed bg-card py-16">
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <CarFront />
                </EmptyMedia>
                <EmptyTitle>No cars match your filters</EmptyTitle>
                <EmptyDescription>
                  Try widening your price range, choosing a different city or clearing some filters.
                </EmptyDescription>
              </EmptyHeader>
              <EmptyContent>
                <Button onClick={reset}>Clear all filters</Button>
              </EmptyContent>
            </Empty>
          ) : (
            <>
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {pagination.pageItems.map((car) => (
                  <CarCard key={car.id} car={car} query={dateQuery} />
                ))}
              </div>
              <SimplePagination
                page={pagination.page}
                pageCount={pagination.pageCount}
                total={pagination.total}
                pageSize={pagination.pageSize}
                onPageChange={pagination.setPage}
                label="cars"
              />
            </>
          )}
        </div>
      </div>
    </div>
  )
}
