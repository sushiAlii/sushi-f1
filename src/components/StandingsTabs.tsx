import { Link } from '@tanstack/react-router'
import type { StandingsTab } from '../lib/standings'

interface StandingsTabsProps {
  active: StandingsTab
}

const TABS: { tab: StandingsTab; label: string }[] = [
  { tab: 'drivers', label: 'Drivers' },
  { tab: 'constructors', label: 'Constructors' },
]

export function StandingsTabs({ active }: StandingsTabsProps) {
  return (
    <nav aria-label="Standings" className="flex w-fit rounded-pill bg-line p-1">
      {TABS.map(({ tab, label }) => (
        <Link
          key={tab}
          to="/standings"
          search={{ tab }}
          aria-current={active === tab ? 'page' : undefined}
          className={`rounded-pill px-4 py-1.5 text-sm font-semibold transition-colors ${active === tab ? 'bg-nori text-rice' : 'text-ink-soft hover:text-ink'}`}
        >
          {label}
        </Link>
      ))}
    </nav>
  )
}
