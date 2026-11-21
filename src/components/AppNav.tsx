import { Link } from '@tanstack/react-router'

interface AppNavProps {
  className?: string
}

const LINK_CLASS =
  'border-b-2 border-transparent px-0.5 pb-1 text-sm font-semibold text-ink-soft transition-colors hover:text-ink data-[status=active]:border-salmon data-[status=active]:text-deep'

export function AppNav({ className = '' }: AppNavProps) {
  return (
    <nav aria-label="Main" className={`flex items-center gap-6 ${className}`}>
      <Link to="/" activeOptions={{ exact: true }} className={LINK_CLASS}>
        Now
      </Link>
      <Link to="/races" className={LINK_CLASS}>
        Races
      </Link>
      <Link to="/standings" activeOptions={{ includeSearch: false }} className={LINK_CLASS}>
        Standings
      </Link>
    </nav>
  )
}
