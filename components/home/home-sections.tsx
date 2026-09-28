'use client'

import Link from 'next/link'
import {
  ArrowRight,
  BadgeIndianRupee,
  CalendarCheck,
  CarFront,
  Headset,
  KeyRound,
  Search,
  ShieldCheck,
  Sparkles,
  Zap,
} from 'lucide-react'
import { useStore } from '@/lib/store'
import { CATEGORIES } from '@/lib/mock-data'
import { initials } from '@/lib/format'
import { CarCard } from '@/components/cars/car-card'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { StarRating } from '@/components/shared/star-rating'

function SectionHeading({ eyebrow, title, description }: { eyebrow: string; title: string; description?: string }) {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center gap-3 text-center">
      <p className="text-sm font-semibold tracking-wide text-primary uppercase">{eyebrow}</p>
      <h2 className="text-3xl font-bold tracking-tight text-balance md:text-4xl">{title}</h2>
      {description && <p className="text-pretty text-muted-foreground">{description}</p>}
    </div>
  )
}

export function FeaturedCars() {
  const { cars } = useStore()
  const featured = [...cars]
    .filter((c) => c.availabilityStatus === 'available')
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 6)

  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8" aria-labelledby="featured-heading">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
        <div className="flex flex-col gap-2">
          <p className="text-sm font-semibold tracking-wide text-primary uppercase">Featured fleet</p>
          <h2 id="featured-heading" className="text-3xl font-bold tracking-tight md:text-4xl">
            Top-rated cars this week
          </h2>
        </div>
        <Button variant="outline" render={<Link href="/cars" />} nativeButton={false}>
          View all cars
          <ArrowRight data-icon="inline-end" />
        </Button>
      </div>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {featured.map((car) => (
          <CarCard key={car.id} car={car} />
        ))}
      </div>
    </section>
  )
}

const categoryIcons: Record<string, React.ElementType> = {
  Hatchback: CarFront,
  Sedan: CarFront,
  SUV: CarFront,
  Luxury: Sparkles,
  Electric: Zap,
}

export function Categories() {
  const { cars } = useStore()
  return (
    <section className="bg-card py-20" aria-labelledby="categories-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Car categories"
          title="The right car for every trip"
          description="From budget hatchbacks for city errands to luxury SUVs for the mountains."
        />
        <ul className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-5">
          {CATEGORIES.map((cat) => {
            const Icon = categoryIcons[cat]
            const count = cars.filter((c) => c.category === cat).length
            const from = Math.min(...cars.filter((c) => c.category === cat).map((c) => c.pricePerDay))
            return (
              <li key={cat}>
                <Link
                  href={`/cars?category=${cat}`}
                  className="flex h-full flex-col gap-3 rounded-xl border bg-background p-5 transition-colors hover:border-primary hover:bg-accent"
                >
                  <span className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <span className="font-semibold">{cat}</span>
                  <span className="text-xs text-muted-foreground">
                    {count} cars{Number.isFinite(from) ? ` · from ₹${from.toLocaleString('en-IN')}/day` : ''}
                  </span>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}

const reasons = [
  { icon: BadgeIndianRupee, title: 'Transparent pricing', text: 'No hidden fees. GST, deposit and discounts are shown upfront before you pay.' },
  { icon: ShieldCheck, title: 'Fully insured cars', text: 'Every rental includes comprehensive insurance and a sanitised, inspected car.' },
  { icon: Headset, title: '24/7 roadside support', text: 'Breakdowns, flat tyres or questions — our team is one call away, any time.' },
  { icon: CalendarCheck, title: 'Flexible bookings', text: 'Free cancellation up to 24 hours before pickup and easy date changes.' },
]

export function WhyChooseUs() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8" aria-labelledby="why-heading">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:items-center">
        <div className="flex flex-col gap-4">
          <p className="text-sm font-semibold tracking-wide text-primary uppercase">Why DriveEasy</p>
          <h2 id="why-heading" className="text-3xl font-bold tracking-tight text-balance md:text-4xl">
            Renting a car should be the easiest part of your trip
          </h2>
          <p className="text-pretty text-muted-foreground">
            Over 12,000 happy customers across Mumbai, Pune, Bengaluru, Delhi, Hyderabad and Chennai trust
            DriveEasy for weekend getaways, business travel and family road trips.
          </p>
          <dl className="mt-4 grid grid-cols-3 gap-4">
            {[
              ['12k+', 'Customers'],
              ['6', 'Cities'],
              ['4.8', 'Avg. rating'],
            ].map(([v, l]) => (
              <div key={l} className="flex flex-col gap-1">
                <dt className="text-xs text-muted-foreground">{l}</dt>
                <dd className="text-2xl font-bold text-primary">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {reasons.map((r) => (
            <Card key={r.title}>
              <CardContent className="flex flex-col gap-3">
                <span className="flex size-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <r.icon className="size-5" aria-hidden="true" />
                </span>
                <h3 className="font-semibold">{r.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{r.text}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

const steps = [
  { icon: Search, title: 'Search & choose', text: 'Pick your city and dates, then filter by budget, fuel type or seats.' },
  { icon: CalendarCheck, title: 'Book & pay', text: 'Confirm your details and pay securely by card, UPI or net banking.' },
  { icon: KeyRound, title: 'Pick up & drive', text: 'Collect your sanitised car at the chosen location and hit the road.' },
]

export function HowItWorks() {
  return (
    <section className="bg-sidebar py-20 text-sidebar-foreground" aria-labelledby="how-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-3 text-center">
          <p className="text-sm font-semibold tracking-wide text-sidebar-primary uppercase">How it works</p>
          <h2 id="how-heading" className="text-3xl font-bold tracking-tight text-balance text-white md:text-4xl">
            On the road in three simple steps
          </h2>
        </div>
        <ol className="mt-12 grid gap-6 md:grid-cols-3">
          {steps.map((s, i) => (
            <li key={s.title} className="flex flex-col gap-4 rounded-xl border border-sidebar-border bg-sidebar-accent p-6">
              <div className="flex items-center justify-between">
                <span className="flex size-11 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <s.icon className="size-5" aria-hidden="true" />
                </span>
                <span className="text-4xl font-bold text-sidebar-border">0{i + 1}</span>
              </div>
              <h3 className="text-lg font-semibold text-white">{s.title}</h3>
              <p className="text-sm leading-relaxed text-sidebar-foreground/80">{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

export function Testimonials() {
  const { reviews, users, cars } = useStore()
  const top = reviews.filter((r) => r.rating >= 5).slice(0, 3)

  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8" aria-labelledby="testimonials-heading">
      <SectionHeading eyebrow="Testimonials" title="Loved by travellers across India" />
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {top.map((r) => {
          const user = users.find((u) => u.id === r.userId)
          const car = cars.find((c) => c.id === r.carId)
          return (
            <Card key={r.id}>
              <CardContent className="flex h-full flex-col gap-4">
                <StarRating rating={r.rating} />
                <blockquote className="flex-1 text-pretty leading-relaxed">{`“${r.comment}”`}</blockquote>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback className="bg-primary/10 text-xs font-semibold text-primary">
                      {initials(user?.name ?? 'Guest')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-semibold">{user?.name}</p>
                    <p className="text-xs text-muted-foreground">
                      Rented {car ? `${car.brand} ${car.model}` : 'a car'}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </section>
  )
}

export function CallToAction() {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
      <div className="flex flex-col items-start justify-between gap-6 rounded-2xl bg-primary p-8 text-primary-foreground md:flex-row md:items-center md:p-12">
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-bold text-balance md:text-3xl">Planning a trip longer than a week?</h2>
          <p className="text-primary-foreground/80">
            Get 10% off automatically on rentals of 7 days or more.
          </p>
        </div>
        <Button size="lg" variant="secondary" render={<Link href="/cars" />} nativeButton={false}>
          Find your car
          <ArrowRight data-icon="inline-end" />
        </Button>
      </div>
    </section>
  )
}
