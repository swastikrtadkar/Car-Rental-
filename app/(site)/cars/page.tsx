import type { Metadata } from 'next'
import { Suspense } from 'react'
import { CarBrowser } from '@/components/cars/car-browser'

export const metadata: Metadata = {
  title: 'Browse Cars',
  description: 'Search and filter rental cars by location, type, fuel, transmission and price.',
}

export default function CarsPage() {
  return (
    <Suspense>
      <CarBrowser />
    </Suspense>
  )
}
