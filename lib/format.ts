import type { AppSettings, Booking, Car } from './types'

const inr = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
})

export function formatCurrency(value: number) {
  return inr.format(value)
}

export function formatDate(iso: string) {
  if (!iso) return '—'
  const d = new Date(`${iso.slice(0, 10)}T00:00:00`)
  return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
}

export function toISODate(date: Date) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

export function todayISO() {
  return toISODate(new Date())
}

export function addDaysISO(iso: string, days: number) {
  const d = new Date(`${iso}T00:00:00`)
  d.setDate(d.getDate() + days)
  return toISODate(d)
}

export function daysBetween(start: string, end: string) {
  if (!start || !end) return 0
  const a = new Date(`${start}T00:00:00`).getTime()
  const b = new Date(`${end}T00:00:00`).getTime()
  return Math.round((b - a) / 86_400_000)
}

export function carName(car?: Pick<Car, 'brand' | 'model'>) {
  return car ? `${car.brand} ${car.model}` : 'Unknown car'
}

export function initials(name: string) {
  return name
    .split(' ')
    .map((p) => p[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

export interface PriceBreakdown {
  rentalDays: number
  pricePerDay: number
  subtotal: number
  discount: number
  tax: number
  deposit: number
  totalAmount: number
}

export function calculatePrice(
  car: Car | undefined,
  pickupDate: string,
  returnDate: string,
  settings: AppSettings,
): PriceBreakdown {
  const rentalDays = Math.max(0, daysBetween(pickupDate, returnDate))
  const pricePerDay = car?.pricePerDay ?? 0
  const subtotal = pricePerDay * rentalDays
  const discount =
    rentalDays >= settings.longRentalDays
      ? Math.round((subtotal * settings.longRentalDiscount) / 100)
      : 0
  const tax = Math.round(((subtotal - discount) * settings.taxRate) / 100)
  const deposit =
    rentalDays === 0
      ? 0
      : car?.category === 'Luxury'
        ? settings.luxuryDeposit
        : settings.standardDeposit
  return {
    rentalDays,
    pricePerDay,
    subtotal,
    discount,
    tax,
    deposit,
    totalAmount: subtotal - discount + tax + deposit,
  }
}

export function rangesOverlap(aStart: string, aEnd: string, bStart: string, bEnd: string) {
  return aStart < bEnd && bStart < aEnd
}

export function hasConflict(
  bookings: Booking[],
  carId: string,
  pickupDate: string,
  returnDate: string,
) {
  return bookings.some(
    (b) =>
      b.carId === carId &&
      ['pending', 'confirmed', 'active'].includes(b.bookingStatus) &&
      rangesOverlap(pickupDate, returnDate, b.pickupDate, b.returnDate),
  )
}

export function downloadFile(filename: string, content: string, type: string) {
  const blob = new Blob([content], { type })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

export function toCSV(rows: Record<string, string | number>[]) {
  if (rows.length === 0) return ''
  const headers = Object.keys(rows[0])
  const escape = (v: string | number) => `"${String(v).replace(/"/g, '""')}"`
  return [headers.join(','), ...rows.map((r) => headers.map((h) => escape(r[h])).join(','))].join('\n')
}
