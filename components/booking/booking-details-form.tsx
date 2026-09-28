'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { useStore } from '@/lib/store'
import type { BookingDraft } from '@/lib/types'
import { BookingSteps } from './booking-steps'
import { NoDraft } from './no-draft'
import { TripSummary } from './trip-summary'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

type Customer = BookingDraft['customer']
type Errors = Partial<Record<keyof Customer | 'terms', string>>

function validate(c: Customer, terms: boolean): Errors {
  const e: Errors = {}
  if (c.name.trim().length < 3) e.name = 'Enter your full name.'
  if (!/^\S+@\S+\.\S+$/.test(c.email)) e.email = 'Enter a valid email address.'
  if (!/^(\+91[\s-]?)?[6-9]\d{4}\s?\d{5}$/.test(c.phone.trim())) e.phone = 'Enter a valid 10-digit Indian mobile number.'
  if (!/^[A-Z]{2}[\s-]?\d{2}[\s-]?\d{4}[\s-]?\d{7}$/i.test(c.licenseNumber.trim()))
    e.licenseNumber = 'Enter a valid licence number, e.g. MH12 2019 0012345.'
  if (c.address.trim().length < 10) e.address = 'Enter your full address.'
  if (!terms) e.terms = 'You must accept the rental terms to continue.'
  return e
}

export function BookingDetailsForm() {
  const router = useRouter()
  const { draft, currentUser, updateDraft } = useStore()
  const [customer, setCustomer] = useState<Customer>(() => ({
    name: draft?.customer.name || currentUser?.name || '',
    email: draft?.customer.email || currentUser?.email || '',
    phone: draft?.customer.phone || currentUser?.phone || '',
    licenseNumber: draft?.customer.licenseNumber || '',
    address: draft?.customer.address || currentUser?.address || '',
  }))
  const [terms, setTerms] = useState(false)
  const [errors, setErrors] = useState<Errors>({})

  if (!draft) return <NoDraft />

  const set = (key: keyof Customer) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setCustomer((c) => ({ ...c, [key]: e.target.value }))

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const errs = validate(customer, terms)
    setErrors(errs)
    if (Object.keys(errs).length > 0) return
    updateDraft({ customer })
    router.push('/booking/payment')
  }

  const fields: { key: keyof Customer; label: string; type?: string; placeholder: string; hint?: string }[] = [
    { key: 'name', label: 'Full name', placeholder: 'As on driving licence' },
    { key: 'email', label: 'Email', type: 'email', placeholder: 'you@example.com' },
    { key: 'phone', label: 'Mobile number', type: 'tel', placeholder: '+91 98765 43210' },
    { key: 'licenseNumber', label: 'Driving licence number', placeholder: 'MH12 2019 0012345', hint: 'You will need to show the physical licence at pickup.' },
  ]

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <BookingSteps current={1} />
      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_380px]">
        <form onSubmit={handleSubmit} noValidate>
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Driver details</CardTitle>
              <CardDescription>Tell us who will be driving. All fields are required.</CardDescription>
            </CardHeader>
            <CardContent>
              <FieldGroup>
                <div className="grid gap-5 sm:grid-cols-2">
                  {fields.map((f) => (
                    <Field key={f.key} data-invalid={errors[f.key] ? true : undefined}>
                      <FieldLabel htmlFor={`bd-${f.key}`}>{f.label}</FieldLabel>
                      <Input
                        id={`bd-${f.key}`}
                        type={f.type ?? 'text'}
                        placeholder={f.placeholder}
                        value={customer[f.key]}
                        onChange={set(f.key)}
                        aria-invalid={errors[f.key] ? true : undefined}
                      />
                      {errors[f.key] ? (
                        <FieldError>{errors[f.key]}</FieldError>
                      ) : (
                        f.hint && <FieldDescription>{f.hint}</FieldDescription>
                      )}
                    </Field>
                  ))}
                </div>
                <Field data-invalid={errors.address ? true : undefined}>
                  <FieldLabel htmlFor="bd-address">Address</FieldLabel>
                  <Textarea
                    id="bd-address"
                    rows={3}
                    placeholder="House / flat, street, city, PIN"
                    value={customer.address}
                    onChange={set('address')}
                    aria-invalid={errors.address ? true : undefined}
                  />
                  {errors.address && <FieldError>{errors.address}</FieldError>}
                </Field>
                <Field orientation="horizontal" data-invalid={errors.terms ? true : undefined}>
                  <Checkbox
                    id="bd-terms"
                    checked={terms}
                    onCheckedChange={setTerms}
                    aria-invalid={errors.terms ? true : undefined}
                  />
                  <div className="flex flex-col gap-1">
                    <FieldLabel htmlFor="bd-terms" className="font-normal">
                      I confirm I am over 21, hold a valid licence and accept the rental terms.
                    </FieldLabel>
                    {errors.terms && <FieldError>{errors.terms}</FieldError>}
                  </div>
                </Field>
              </FieldGroup>
            </CardContent>
            <CardFooter className="justify-between gap-3 border-t">
              <Button type="button" variant="ghost" onClick={() => router.back()}>
                Back
              </Button>
              <Button type="submit" size="lg">
                Continue to payment
                <ArrowRight data-icon="inline-end" />
              </Button>
            </CardFooter>
          </Card>
        </form>
        <TripSummary draft={draft} />
      </div>
    </div>
  )
}
