'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function usePagination<T>(items: T[], pageSize: number) {
  const [page, setPage] = useState(1)
  const pageCount = Math.max(1, Math.ceil(items.length / pageSize))
  const current = Math.min(page, pageCount)
  const pageItems = items.slice((current - 1) * pageSize, current * pageSize)
  return { page: current, setPage, pageCount, pageItems, total: items.length, pageSize }
}

interface SimplePaginationProps {
  page: number
  pageCount: number
  total: number
  pageSize: number
  onPageChange: (page: number) => void
  label?: string
}

export function SimplePagination({
  page,
  pageCount,
  total,
  pageSize,
  onPageChange,
  label = 'results',
}: SimplePaginationProps) {
  if (total === 0) return null
  const start = (page - 1) * pageSize + 1
  const end = Math.min(page * pageSize, total)

  return (
    <nav
      aria-label="Pagination"
      className="flex flex-col items-center justify-between gap-3 sm:flex-row"
    >
      <p className="text-sm text-muted-foreground">
        Showing <span className="font-medium text-foreground">{start}</span>–
        <span className="font-medium text-foreground">{end}</span> of{' '}
        <span className="font-medium text-foreground">{total}</span> {label}
      </p>
      <div className="flex items-center gap-1">
        <Button
          variant="outline"
          size="sm"
          disabled={page === 1}
          onClick={() => onPageChange(page - 1)}
        >
          <ChevronLeft data-icon="inline-start" />
          Prev
        </Button>
        {Array.from({ length: pageCount }, (_, i) => i + 1).map((p) => (
          <Button
            key={p}
            size="icon-sm"
            variant={p === page ? 'default' : 'ghost'}
            aria-current={p === page ? 'page' : undefined}
            onClick={() => onPageChange(p)}
          >
            {p}
          </Button>
        ))}
        <Button
          variant="outline"
          size="sm"
          disabled={page === pageCount}
          onClick={() => onPageChange(page + 1)}
        >
          Next
          <ChevronRight data-icon="inline-end" />
        </Button>
      </div>
    </nav>
  )
}
