import { CarFront, ShieldCheck, Sparkles, Users } from 'lucide-react'

const highlights = [
  {
    icon: CarFront,
    title: 'Wide range of cars',
    text: 'Choose from hatchbacks, sedans, SUVs, electric cars and luxury vehicles for different travel needs.',
  },
  {
    icon: ShieldCheck,
    title: 'Transparent pricing',
    text: 'See rental charges, taxes, discounts and refundable deposits clearly before confirming a booking.',
  },
  {
    icon: Sparkles,
    title: 'Simple booking',
    text: 'Search, compare, enter your details and complete your booking through a simple step-by-step flow.',
  },
  {
    icon: Users,
    title: 'Customer focused',
    text: 'DriveEasy is designed to make car rental convenient for individuals, families and business travellers.',
  },
]

export default function AboutPage() {
  return (
    <div className="bg-background">
      <section className="border-b bg-card">
        <div className="mx-auto max-w-5xl px-4 py-16 text-center sm:px-6 lg:px-8 lg:py-20">
          <p className="mb-3 text-sm font-semibold text-primary">ABOUT DRIVE EASY</p>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Car rental made simple
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground">
            DriveEasy is a modern car-rental platform that helps customers find the right car,
            understand the price and complete a booking online with ease.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map((item) => {
            const Icon = item.icon
            return (
              <div key={item.title} className="rounded-xl border bg-card p-6">
                <div className="mb-4 flex size-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="size-5" />
                </div>
                <h2 className="font-semibold">{item.title}</h2>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.text}</p>
              </div>
            )
          })}
        </div>

        <div className="mt-10 rounded-2xl border bg-card p-6 sm:p-8">
          <h2 className="text-2xl font-bold">How DriveEasy works</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {[
              ['01', 'Choose your car', 'Browse available cars and filter them by category and preferences.'],
              ['02', 'Enter your details', 'Provide the driver and trip information required for the reservation.'],
              ['03', 'Confirm your booking', 'Review the price, select a payment method and confirm the rental.'],
            ].map(([number, title, text]) => (
              <div key={number} className="flex gap-4">
                <span className="text-sm font-bold text-primary">{number}</span>
                <div>
                  <h3 className="font-semibold">{title}</h3>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
