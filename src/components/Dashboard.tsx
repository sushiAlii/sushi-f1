import type { ReactNode } from 'react'
import { useGetSchedule } from '../hooks/useGetSchedule'
import { useNow } from '../hooks/useNow'
import { getTrackerState, type TrackerState } from '../lib/tracker'
import { AppHeader } from './AppHeader'
import { CountdownCard } from './CountdownCard'
import { LiveHero } from './LiveHero'
import { ResultsCard } from './ResultsCard'
import { ScheduleList } from './ScheduleList'
import { StatusMessage } from './StatusMessage'
import { UpcomingHero } from './UpcomingHero'

interface DashboardProps {
  simulatedNow?: number
}

function TwoColumns({ title, children }: { title: string; children: ReactNode }) {
  return (
    <>
      <h1 className="font-heading text-3xl md:text-4xl">{title}</h1>
      <div className="grid gap-6 lg:grid-cols-2 lg:items-start lg:gap-10">{children}</div>
    </>
  )
}

function TrackerView({ state, now }: { state: TrackerState; now: number }) {
  switch (state.kind) {
    case 'upcoming':
      return (
        <TwoColumns title="Next up">
          <UpcomingHero session={state.next} now={now} />
          <ScheduleList sessions={state.weekend} now={now} next={state.next} />
        </TwoColumns>
      )
    case 'live':
      return (
        <TwoColumns title="Happening now">
          <LiveHero session={state.session} elapsedMs={state.elapsedMs} />
          <ScheduleList sessions={state.weekend} now={now} />
        </TwoColumns>
      )
    case 'finished':
      return (
        <TwoColumns title="Just finished">
          <ResultsCard key={state.session.id} session={state.session} />
          <div className="flex flex-col gap-6">
            {state.next && <CountdownCard session={state.next} now={now} />}
            <ScheduleList
              sessions={state.weekend}
              now={now}
              next={state.next}
              title={state.session.raceName}
            />
          </div>
        </TwoColumns>
      )
    case 'idle':
      return (
        <StatusMessage
          title="No upcoming sessions"
          body="The season is over for now. Check back when the next calendar is published."
        />
      )
  }
}

export function Dashboard({ simulatedNow }: DashboardProps) {
  const { data: sessions, isPending, isError, refetch } = useGetSchedule()
  const now = useNow(simulatedNow)
  const state = sessions && getTrackerState(sessions, now)

  return (
    <div className="mx-auto flex min-h-dvh max-w-content flex-col px-5 md:px-8 lg:px-12">
      <AppHeader />
      <main className="flex flex-1 flex-col gap-6 pb-10">
        {isPending && <StatusMessage title="Loading the schedule" />}
        {isError && !state && (
          <StatusMessage
            title="Couldn’t load the schedule"
            body="The F1 data service didn’t respond."
            action={
              <button
                type="button"
                onClick={() => void refetch()}
                className="rounded-pill bg-salmon px-5 py-2.5 text-sm font-bold text-nori"
              >
                Try again
              </button>
            }
          />
        )}
        {state && <TrackerView state={state} now={now} />}
      </main>
      <footer className="pb-8 text-center text-xs text-ink-faint">
        Times converted to your local timezone
      </footer>
    </div>
  )
}
