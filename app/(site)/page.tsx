import Image from 'next/image'
import { CheckCircle2 } from 'lucide-react'
import { SearchForm } from '@/components/home/search-form'
import {
  CallToAction,
  Categories,
  FeaturedCars,
  HowItWorks,
  Testimonials,
  WhyChooseUs,
} from '@/components/home/home-sections'

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden border-b bg-card">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 pt-12 pb-10 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-6 lg:px-8 lg:pt-20">
          <div className="flex flex-col gap-6">
            <p className="w-fit rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
              Now in 6 cities across India
            </p>
            <h1 className="text-4xl font-bold tracking-tight text-balance sm:text-5xl lg:text-6xl">
              Rent the perfect car for <span className="text-primary">every journey</span>
            </h1>
            <p className="max-w-lg text-lg text-pretty text-muted-foreground">
              Choose from hatchbacks, sedans, SUVs, EVs and luxury cars. Book in minutes with transparent
              pricing and free cancellation.
            </p>
            <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
              {['No hidden charges', 'Free cancellation', '24/7 support'].map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-success" aria-hidden="true" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl lg:aspect-[5/4]">
            <Image
              src="/images/hero.png"
              alt="A premium SUV parked on a scenic highway at golden hour"
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
        <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
          <SearchForm />
        </div>
      </section>
      <FeaturedCars />
      <Categories />
      <WhyChooseUs />
      <HowItWorks />
      <Testimonials />
      <CallToAction />
    </>
  )
}
