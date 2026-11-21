import { useGetSchedule } from '../hooks/useGetSchedule'
import { useNow } from '../hooks/useNow'
import { groupWeekends } from '../lib/sessions'
import { getWeekendStatus } from '../lib/tracker'
import { RaceCard } from './RaceCard'
import { RetryMessage } from './RetryMessage'
import { StatusMessage } from './StatusMessage'

export function RaceCalendar() {
  const { data: sessions, isPending, isError, refetch } = useGetSchedule()
  const now = useNow()
  const weekends = sessions ? groupWeekends(sessions) : []
  const next = weekends.find(({ start }) => start > now)

  if (isPending) return <StatusMessage title="Loading the schedule" />

  if (!sessions) {
    return isError ? (
      <RetryMessage title="Couldn’t load the schedule" onRetry={() => void refetch()} />
    ) : null
  }

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-heading text-3xl md:text-4xl">Races</h1>
        {weekends[0] && (
          <span className="rounded-pill bg-raised px-3 py-1 text-xs font-bold tracking-wider text-deep uppercase">
            {weekends[0].season} season
          </span>
        )}
      </div>
      <ul className="grid gap-3 lg:grid-cols-2">
        {weekends.map((weekend) => (
          <li key={weekend.round} className="contents">
            <RaceCard weekend={weekend} status={getWeekendStatus(weekend, now, next)} />
          </li>
        ))}
      </ul>
    </>
  )
}
