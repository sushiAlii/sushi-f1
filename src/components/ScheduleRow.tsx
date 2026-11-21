import { formatDay, formatTime } from '../lib/time'
import type { Session } from '../lib/sessions'
import type { SessionStatus } from '../lib/tracker'
import { CheckIcon } from './icons'

interface ScheduleRowProps {
  session: Session
  status: SessionStatus
}

const ROW_STYLES: Record<SessionStatus, string> = {
  finished: 'bg-card',
  upcoming: 'bg-card',
  next: 'relative overflow-hidden bg-raised shadow-plate-rest before:absolute before:inset-y-0 before:left-0 before:w-1.5 before:bg-salmon',
  live: 'relative overflow-hidden bg-raised shadow-plate-rest before:absolute before:inset-y-0 before:left-0 before:w-1.5 before:bg-salmon',
}

const CHIP_LABELS: Partial<Record<SessionStatus, string>> = {
  finished: 'Finished',
  live: 'Live now',
  next: 'Next up',
}

const CHIP_STYLES: Partial<Record<SessionStatus, string>> = {
  finished: 'bg-sage/15 text-sage-deep',
  live: 'bg-salmon text-nori',
  next: 'bg-salmon text-nori',
}

function StatusMark({ status }: { status: SessionStatus }) {
  if (status === 'finished') {
    return (
      <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-sage/15 text-sage-deep">
        <CheckIcon className="size-4" />
      </span>
    )
  }

  if (status === 'upcoming') {
    return <span className="size-8 shrink-0 rounded-full border-2 border-line" />
  }

  return (
    <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-salmon/20">
      <span
        className={`size-3 rounded-full bg-salmon ${status === 'live' ? 'animate-pulse' : ''}`}
      />
    </span>
  )
}

export function ScheduleRow({ session, status }: ScheduleRowProps) {
  const chipLabel = CHIP_LABELS[status]

  return (
    <li
      className={`flex items-center gap-3.5 rounded-2xl p-4 md:last:odd:col-span-2 lg:last:odd:col-span-1 ${ROW_STYLES[status]}`}
    >
      <StatusMark status={status} />
      <div className="min-w-0 flex-1">
        <p className="font-bold">{session.label}</p>
        <p className="text-sm text-ink-soft tabular-nums">
          {formatDay(session.start)} · {formatTime(session.start)}
        </p>
      </div>
      {chipLabel && (
        <span
          className={`shrink-0 rounded-pill px-3 py-1 text-xs font-bold ${CHIP_STYLES[status]}`}
        >
          {chipLabel}
        </span>
      )}
    </li>
  )
}
