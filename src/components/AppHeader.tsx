import { Link } from '@tanstack/react-router'
import { AppNav } from './AppNav'
import { TimezonePill } from './TimezonePill'

export function AppHeader() {
  return (
    <header className="flex flex-wrap items-center gap-x-8 gap-y-3 py-5">
      <Link to="/" className="order-1 flex items-center gap-2.5">
        <span className="size-2.5 rounded-full bg-salmon" />
        <span className="font-heading text-xl">Sushi Paddock</span>
      </Link>
      <div className="order-2 ml-auto md:order-3">
        <TimezonePill />
      </div>
      <AppNav className="order-3 w-full md:order-2 md:w-auto" />
    </header>
  )
}
