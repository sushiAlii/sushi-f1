import type { ReactNode } from 'react'
import { AppHeader } from './AppHeader'

interface AppShellProps {
  children: ReactNode
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="mx-auto flex min-h-dvh max-w-content flex-col px-5 md:px-8 lg:px-12">
      <AppHeader />
      <main className="flex flex-1 flex-col gap-6 pb-10">{children}</main>
      <footer className="pb-8 text-center text-xs text-ink-faint">
        Times converted to your local timezone
      </footer>
    </div>
  )
}
