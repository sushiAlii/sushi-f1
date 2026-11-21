import { TimezonePill } from './TimezonePill'

export function AppHeader() {
  return (
    <header className="flex flex-wrap items-center justify-between gap-3 py-5">
      <div className="flex items-center gap-2.5">
        <span className="size-2.5 rounded-full bg-salmon" />
        <span className="font-heading text-xl">Sushi Paddock</span>
      </div>
      <TimezonePill />
    </header>
  )
}
