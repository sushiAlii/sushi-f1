import { useState } from 'react'
import { getTimezoneLabel } from '../lib/time'
import { ClockIcon } from './icons'

export function TimezonePill() {
  const [label] = useState(() => getTimezoneLabel(Date.now()))

  return (
    <div className="flex items-center gap-1.5 rounded-pill bg-raised px-3 py-1.5 text-xs font-medium text-ink-soft">
      <ClockIcon className="size-3.5 text-deep" />
      <span>
        <span className="max-[440px]:sr-only">Your time: </span>
        <strong className="font-semibold text-ink">{label}</strong>
      </span>
    </div>
  )
}
