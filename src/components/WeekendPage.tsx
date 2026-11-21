import { Link } from '@tanstack/react-router'
import { useGetSchedule } from '../hooks/useGetSchedule'
import { useNow } from '../hooks/useNow'
import { groupWeekends } from '../lib/sessions'
import { getSessionStatus } from '../lib/tracker'
import { ResultsCard } from './ResultsCard'
import { RetryMessage } from './RetryMessage'
import { ScheduleList } from './ScheduleList'
import { StatusMessage } from './StatusMessage'
import { ArrowLeftIcon } from './icons'

interface WeekendPageProps {
  round: number
}

export function WeekendPage({ round }: WeekendPageProps) {
  const { data: sessions, isPending, isError, refetch } = useGetSchedule()
  const now = useNow()
  const weekend = sessions && groupWeekends(sessions).find((candidate) => candidate.round === round)

  if (isPending) return <StatusMessage title="Loading the schedule" />

  if (!sessions) {
    return isError ? (
      <RetryMessage title="Couldn’t load the schedule" onRetry={() => void refetch()} />
    ) : null
  }

  if (!weekend) {
    return (
      <StatusMessage
        title="Race not found"
        body="There is no round with that number this season."
        action={
          <Link
            to="/races"
            className="rounded-pill bg-salmon px-5 py-2.5 text-sm font-bold text-nori"
          >
            All races
          </Link>
        }
      />
    )
  }

  const finishedResults = weekend.sessions
    .filter((session) => session.hasResults && getSessionStatus(session, now) === 'finished')
    .toReversed()
  const nextSession = weekend.sessions.find(({ start }) => start > now)

  return (
    <>
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <Link
            to="/races"
            className="flex items-center gap-1.5 text-sm font-semibold text-deep hover:underline"
          >
            <ArrowLeftIcon className="size-4" />
            All races
          </Link>
          <span className="rounded-pill bg-raised px-2.5 py-1 text-xs font-bold tracking-wider text-deep uppercase">
            Round {weekend.round}
          </span>
        </div>
        <h1 className="font-heading text-4xl md:text-5xl">{weekend.raceName}</h1>
        <p className="text-ink-soft">{weekend.circuitName}</p>
      </header>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-start lg:gap-10">
        <div className="lg:order-2">
          <ScheduleList sessions={weekend.sessions} now={now} next={nextSession} title="Sessions" />
        </div>
        <div className="flex flex-col gap-6 lg:order-1">
          {finishedResults.map((session) => (
            <ResultsCard key={session.id} session={session} />
          ))}
          {finishedResults.length === 0 && (
            <section className="rounded-card bg-card p-8 text-center text-ink-soft shadow-plate-rest">
              No results yet. They appear here after qualifying, the sprint and the race.
            </section>
          )}
        </div>
      </div>
    </>
  )
}
