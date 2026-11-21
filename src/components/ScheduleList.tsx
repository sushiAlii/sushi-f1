import type { Session } from '../lib/sessions'
import { getSessionStatus } from '../lib/tracker'
import { ScheduleRow } from './ScheduleRow'

interface ScheduleListProps {
  sessions: Session[]
  now: number
  next?: Session
  title?: string
}

export function ScheduleList({ sessions, now, next, title = 'This weekend' }: ScheduleListProps) {
  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="font-heading text-2xl">{title}</h2>
        <span className="rounded-pill bg-raised px-3 py-1 text-xs font-semibold text-ink-soft">
          {sessions.length} sessions
        </span>
      </div>
      <ul className="grid gap-3 md:grid-cols-2 lg:grid-cols-1">
        {sessions.map((session) => (
          <ScheduleRow
            key={session.id}
            session={session}
            status={getSessionStatus(session, now, next)}
          />
        ))}
      </ul>
    </section>
  )
}
