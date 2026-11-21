import { Link } from '@tanstack/react-router'
import type { Weekend } from '../lib/sessions'
import { formatDay } from '../lib/time'
import type { WeekendStatus } from '../lib/tracker'
import { StatusChip } from './StatusChip'
import { ChevronRightIcon } from './icons'

interface RaceCardProps {
  weekend: Weekend
  status: WeekendStatus
}

export function RaceCard({ weekend, status }: RaceCardProps) {
  const highlighted = status === 'live' || status === 'in-progress'
  const mutedText = highlighted ? 'text-rice/70' : 'text-ink-soft'

  return (
    <Link
      to="/races/$round"
      params={{ round: weekend.round }}
      className={`flex items-center gap-4 rounded-2xl p-5 shadow-plate-rest transition-shadow duration-200 hover:shadow-plate-hover ${highlighted ? 'bg-nori text-rice' : 'bg-card'}`}
    >
      <div className="flex min-w-0 flex-1 flex-col gap-1.5">
        <div className="flex items-center gap-2.5">
          <span className={`text-xs font-bold tracking-wider tabular-nums ${mutedText}`}>
            R{weekend.round}
          </span>
          <StatusChip status={status} />
        </div>
        <p className="text-lg font-bold">{weekend.raceName}</p>
        <p className={`text-sm ${mutedText}`}>{weekend.circuitName}</p>
        <p
          className={`text-sm font-semibold tabular-nums ${highlighted ? 'text-salmon' : 'text-deep'}`}
        >
          {formatDay(weekend.raceStart)}
        </p>
      </div>
      <ChevronRightIcon className={`size-5 shrink-0 ${mutedText}`} />
    </Link>
  )
}
