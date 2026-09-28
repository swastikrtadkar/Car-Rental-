'use client'

import { StoreProvider } from '@/lib/store'
import { Toaster } from '@/components/ui/sonner'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <StoreProvider>
      {children}
      <Toaster richColors position="top-right" />
    </StoreProvider>
  )
}
