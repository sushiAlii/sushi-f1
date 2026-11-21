import type { ReactNode } from 'react'

interface StatusMessageProps {
  title: string
  body?: string
  action?: ReactNode
}

export function StatusMessage({ title, body, action }: StatusMessageProps) {
  return (
    <section
      role="status"
      className="flex flex-col items-center gap-3 rounded-card bg-card px-6 py-16 text-center shadow-plate-rest"
    >
      <h2 className="font-heading text-3xl">{title}</h2>
      {body && <p className="max-w-md text-ink-soft">{body}</p>}
      {action}
    </section>
  )
}
