import type { PriceBreakdown } from '@/lib/format'
import { formatCurrency } from '@/lib/format'
import { Separator } from '@/components/ui/separator'

export function PriceSummary({ price, taxRate }: { price: PriceBreakdown; taxRate: number }) {
  const rows: [string, number, boolean?][] = [
    [`${formatCurrency(price.pricePerDay)} × ${price.rentalDays} day${price.rentalDays === 1 ? '' : 's'}`, price.subtotal],
  ]
  if (price.discount > 0) rows.push(['Long rental discount', -price.discount, true])
  rows.push([`GST (${taxRate}%)`, price.tax])
  rows.push(['Refundable security deposit', price.deposit])

  return (
    <dl className="flex flex-col gap-2.5 text-sm">
      {rows.map(([label, value, positive]) => (
        <div key={label} className="flex items-center justify-between gap-4">
          <dt className="text-muted-foreground">{label}</dt>
          <dd className={positive ? 'font-medium text-success' : 'font-medium'}>
            {value < 0 ? `− ${formatCurrency(-value)}` : formatCurrency(value)}
          </dd>
        </div>
      ))}
      <Separator className="my-1" />
      <div className="flex items-center justify-between gap-4">
        <dt className="font-semibold">Total payable</dt>
        <dd className="text-lg font-bold text-primary">{formatCurrency(price.totalAmount)}</dd>
      </div>
    </dl>
  )
}
