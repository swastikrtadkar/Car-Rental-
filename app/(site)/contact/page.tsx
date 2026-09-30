import { Mail, MapPin, Phone } from 'lucide-react'

export default function ContactPage() {
  return (
    <div className="bg-background">
      <section className="border-b bg-card">
        <div className="mx-auto max-w-5xl px-4 py-16 text-center sm:px-6 lg:px-8 lg:py-20">
          <p className="mb-3 text-sm font-semibold text-primary">CONTACT US</p>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">We’re here to help</h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground">
            Have a question about a booking, vehicle or payment? Reach out to the DriveEasy support team.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-xl border bg-card p-6">
            <div className="flex size-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Phone className="size-5" />
            </div>
            <h2 className="mt-4 font-semibold">Phone</h2>
            <p className="mt-2 text-sm text-muted-foreground">+91 1800 123 4567</p>
            <p className="mt-1 text-xs text-muted-foreground">24/7 customer support</p>
          </div>

          <div className="rounded-xl border bg-card p-6">
            <div className="flex size-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Mail className="size-5" />
            </div>
            <h2 className="mt-4 font-semibold">Email</h2>
            <p className="mt-2 text-sm text-muted-foreground">support@driveeasy.example</p>
            <p className="mt-1 text-xs text-muted-foreground">We usually reply within one business day.</p>
          </div>

          <div className="rounded-xl border bg-card p-6">
            <div className="flex size-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <MapPin className="size-5" />
            </div>
            <h2 className="mt-4 font-semibold">Service locations</h2>
            <p className="mt-2 text-sm text-muted-foreground">Mumbai, Pune, Delhi, Bengaluru, Hyderabad and Chennai.</p>
          </div>
        </div>

        <div className="mt-8 rounded-xl border bg-card p-6 sm:p-8">
          <h2 className="text-2xl font-bold">Before contacting support</h2>
          <p className="mt-2 text-muted-foreground">
            Keep your booking ID ready if your question is related to an existing reservation.
            This helps the support team locate the booking quickly.
          </p>
        </div>
      </section>
    </div>
  )
}
