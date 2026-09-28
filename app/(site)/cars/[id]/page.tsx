import { Suspense } from 'react'
import { CarDetails } from '@/components/cars/car-details'

export default async function CarDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return (
    <Suspense>
      <CarDetails id={id} />
    </Suspense>
  )
}
