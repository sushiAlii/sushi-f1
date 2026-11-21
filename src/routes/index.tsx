import { createFileRoute } from '@tanstack/react-router'
import { Dashboard } from '../components/Dashboard'

interface HomeSearch {
  now?: string
}

export const Route = createFileRoute('/')({
  validateSearch: (search: Record<string, unknown>): HomeSearch => ({
    now:
      typeof search.now === 'string' && !Number.isNaN(Date.parse(search.now))
        ? search.now
        : undefined,
  }),
  component: HomePage,
})

function HomePage() {
  const { now } = Route.useSearch()

  return <Dashboard simulatedNow={now ? Date.parse(now) : undefined} />
}
