'use client'

import { BRANDS, CATEGORIES, FUEL_TYPES, LOCATIONS } from '@/lib/mock-data'
import { formatCurrency } from '@/lib/format'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Field, FieldGroup, FieldLabel, FieldLegend, FieldSet } from '@/components/ui/field'
import { Separator } from '@/components/ui/separator'
import { Slider } from '@/components/ui/slider'
import { Switch } from '@/components/ui/switch'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export const PRICE_MIN = 1000
export const PRICE_MAX = 8000

export interface Filters {
  location: string
  brand: string
  transmission: string
  seats: string
  categories: string[]
  fuels: string[]
  price: [number, number]
  availableOnly: boolean
}

export const defaultFilters: Filters = {
  location: 'all',
  brand: 'all',
  transmission: 'all',
  seats: 'all',
  categories: [],
  fuels: [],
  price: [PRICE_MIN, PRICE_MAX],
  availableOnly: false,
}

function toggle(list: string[], value: string, on: boolean) {
  return on ? [...list, value] : list.filter((v) => v !== value)
}

function FilterSelect({
  id,
  label,
  value,
  onChange,
  options,
  allLabel,
}: {
  id: string
  label: string
  value: string
  onChange: (v: string) => void
  options: readonly string[] | { value: string; label: string }[]
  allLabel: string
}) {
  const items = [
    { value: 'all', label: allLabel },
    ...options.map((o) => (typeof o === 'string' ? { value: o, label: o } : o)),
  ]
  return (
    <Field>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <Select items={items} value={value} onValueChange={(v) => onChange((v as string) ?? 'all')}>
        <SelectTrigger id={id} className="w-full">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {items.map((o) => (
              <SelectItem key={o.value} value={o.value}>
                {o.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </Field>
  )
}

export function CarFilters({
  filters,
  onChange,
  onReset,
}: {
  filters: Filters
  onChange: (patch: Partial<Filters>) => void
  onReset: () => void
}) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold">Filters</h2>
        <Button variant="ghost" size="sm" onClick={onReset}>
          Reset all
        </Button>
      </div>

      <FieldGroup className="gap-4">
        <FilterSelect
          id="f-location"
          label="Location"
          value={filters.location}
          onChange={(v) => onChange({ location: v })}
          options={LOCATIONS}
          allLabel="All locations"
        />
        <FilterSelect
          id="f-brand"
          label="Brand"
          value={filters.brand}
          onChange={(v) => onChange({ brand: v })}
          options={BRANDS}
          allLabel="All brands"
        />
      </FieldGroup>

      <Separator />

      <FieldSet>
        <FieldLegend variant="label">Car type</FieldLegend>
        <FieldGroup data-slot="checkbox-group" className="gap-3">
          {CATEGORIES.map((cat) => (
            <Field key={cat} orientation="horizontal">
              <Checkbox
                id={`cat-${cat}`}
                checked={filters.categories.includes(cat)}
                onCheckedChange={(on) => onChange({ categories: toggle(filters.categories, cat, on) })}
              />
              <FieldLabel htmlFor={`cat-${cat}`} className="font-normal">
                {cat}
              </FieldLabel>
            </Field>
          ))}
        </FieldGroup>
      </FieldSet>

      <Separator />

      <FieldSet>
        <FieldLegend variant="label">Fuel type</FieldLegend>
        <FieldGroup data-slot="checkbox-group" className="gap-3">
          {FUEL_TYPES.map((fuel) => (
            <Field key={fuel} orientation="horizontal">
              <Checkbox
                id={`fuel-${fuel}`}
                checked={filters.fuels.includes(fuel)}
                onCheckedChange={(on) => onChange({ fuels: toggle(filters.fuels, fuel, on) })}
              />
              <FieldLabel htmlFor={`fuel-${fuel}`} className="font-normal">
                {fuel}
              </FieldLabel>
            </Field>
          ))}
        </FieldGroup>
      </FieldSet>

      <Separator />

      <FieldGroup className="gap-4">
        <FilterSelect
          id="f-transmission"
          label="Transmission"
          value={filters.transmission}
          onChange={(v) => onChange({ transmission: v })}
          options={['Manual', 'Automatic']}
          allLabel="Any transmission"
        />
        <FilterSelect
          id="f-seats"
          label="Seating capacity"
          value={filters.seats}
          onChange={(v) => onChange({ seats: v })}
          options={[
            { value: '4', label: '4+ seats' },
            { value: '5', label: '5+ seats' },
            { value: '7', label: '7+ seats' },
          ]}
          allLabel="Any seats"
        />
      </FieldGroup>

      <Separator />

      <Field>
        <div className="flex items-center justify-between">
          <FieldLabel>Price per day</FieldLabel>
          <span className="text-xs text-muted-foreground">
            {formatCurrency(filters.price[0])} – {formatCurrency(filters.price[1])}
          </span>
        </div>
        <Slider
          aria-label="Price per day range"
          min={PRICE_MIN}
          max={PRICE_MAX}
          step={100}
          value={filters.price}
          onValueChange={(v) => Array.isArray(v) && onChange({ price: [v[0], v[1]] })}
          className="mt-2"
        />
      </Field>

      <Separator />

      <Field orientation="horizontal" className="justify-between">
        <FieldLabel htmlFor="f-available">Available cars only</FieldLabel>
        <Switch
          id="f-available"
          checked={filters.availableOnly}
          onCheckedChange={(on) => onChange({ availableOnly: on })}
        />
      </Field>
    </div>
  )
}
