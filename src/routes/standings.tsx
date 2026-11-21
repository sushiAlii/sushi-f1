import { createFileRoute } from '@tanstack/react-router'
import { StandingsPage } from '../components/StandingsPage'
import type { StandingsTab } from '../lib/standings'

interface StandingsSearch {
  tab?: StandingsTab
}

export const Route = createFileRoute('/standings')({
  validateSearch: (search: Record<string, unknown>): StandingsSearch => ({
    tab: search.tab === 'constructors' ? 'constructors' : undefined,
  }),
  component: StandingsRoute,
})

function StandingsRoute() {
  const { tab = 'drivers' } = Route.useSearch()

  return <StandingsPage tab={tab} />
}
