import type { WeekendStatus } from '../lib/tracker'

interface StatusChipProps {
  status: WeekendStatus
}

const CHIPS: Record<WeekendStatus, { label: string; className: string }> = {
  finished: { label: 'Finished', className: 'bg-sage/15 text-sage-deep' },
  live: { label: 'Live now', className: 'bg-salmon text-nori' },
  'in-progress': { label: 'This weekend', className: 'bg-salmon text-nori' },
  next: { label: 'Next up', className: 'bg-salmon text-nori' },
  upcoming: { label: 'Upcoming', className: 'bg-line text-ink-soft' },
}

export function StatusChip({ status }: StatusChipProps) {
  const { label, className } = CHIPS[status]

  return (
    <span className={`shrink-0 rounded-pill px-3 py-1 text-xs font-bold ${className}`}>
      {label}
    </span>
  )
}
