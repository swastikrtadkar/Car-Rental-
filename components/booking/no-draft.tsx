import Link from 'next/link'
import { CarFront } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty'

export function NoDraft() {
  return (
    <Empty className="min-h-[60vh]">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <CarFront />
        </EmptyMedia>
        <EmptyTitle>No booking in progress</EmptyTitle>
        <EmptyDescription>Choose a car and your trip dates to start a new booking.</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button render={<Link href="/cars" />} nativeButton={false}>
          Browse cars
        </Button>
      </EmptyContent>
    </Empty>
  )
}
