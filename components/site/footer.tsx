import Link from 'next/link'
import { Mail, MapPin, Phone } from 'lucide-react'
import { Logo } from './logo'

const columns = [
  {
    title: 'Company',
    links: [
      { href: '/about', label: 'About us' },
      { href: '/contact', label: 'Contact' },
      { href: '/cars', label: 'Our fleet' },
    ],
  },
  {
    title: 'Customers',
    links: [
      { href: '/login', label: 'Sign in' },
      { href: '/register', label: 'Create account' },
      { href: '/my-bookings', label: 'My bookings' },
    ],
  },
  {
    title: 'Categories',
    links: [
      { href: '/cars?category=SUV', label: 'SUVs' },
      { href: '/cars?category=Sedan', label: 'Sedans' },
      { href: '/cars?category=Electric', label: 'Electric' },
      { href: '/cars?category=Luxury', label: 'Luxury' },
    ],
  },
]

export function Footer() {
  return (
    <footer className="border-t bg-card">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-5 lg:px-8">
        <div className="flex flex-col gap-4 lg:col-span-2">
          <Logo />
          <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
            Affordable, reliable car rentals across six Indian cities. Transparent pricing,
            sanitised cars and 24/7 roadside support.
          </p>
          <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
            <li className="flex items-center gap-2">
              <MapPin className="size-4" aria-hidden="true" /> Andheri East, Mumbai 400069
            </li>
            <li className="flex items-center gap-2">
              <Phone className="size-4" aria-hidden="true" /> +91 98000 00000
            </li>
            <li className="flex items-center gap-2">
              <Mail className="size-4" aria-hidden="true" /> support@driveeasy.com
            </li>
          </ul>
        </div>
        {columns.map((col) => (
          <div key={col.title} className="flex flex-col gap-3">
            <h3 className="text-sm font-semibold">{col.title}</h3>
            <ul className="flex flex-col gap-2">
              {col.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-muted-foreground hover:text-foreground">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-6 text-xs text-muted-foreground sm:flex-row sm:px-6 lg:px-8">
          <p>© 2026 DriveEasy Rentals Pvt. Ltd. All rights reserved.</p>
          <p>Car Rental Management System — Academic Project</p>
        </div>
      </div>
    </footer>
  )
}
