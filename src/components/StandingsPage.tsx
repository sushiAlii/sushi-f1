import type { StandingsTab } from '../lib/standings'
import { ConstructorStandings } from './ConstructorStandings'
import { DriverStandings } from './DriverStandings'
import { StandingsTabs } from './StandingsTabs'

interface StandingsPageProps {
  tab: StandingsTab
}

export function StandingsPage({ tab }: StandingsPageProps) {
  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-heading text-3xl md:text-4xl">Standings</h1>
        <StandingsTabs active={tab} />
      </div>
      {tab === 'drivers' ? <DriverStandings /> : <ConstructorStandings />}
    </>
  )
}
