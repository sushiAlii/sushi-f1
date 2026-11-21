import type { ReactNode } from 'react'

interface InfoBoxProps {
  label: string
  children: ReactNode
}

export function InfoBox({ label, children }: InfoBoxProps) {
  return (
    <div className="flex flex-col gap-1.5 rounded-2xl bg-white/5 p-5">
      <p className="text-xs font-semibold tracking-wider text-rice/60 uppercase">{label}</p>
      {children}
    </div>
  )
}
