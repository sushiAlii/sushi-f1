import { formatCountdown, formatDay, formatTime } from '../lib/time'
import type { Session } from '../lib/sessions'

interface CountdownCardProps {
  session: Session
  now: number
}

export function CountdownCard({ session, now }: CountdownCardProps) {
  return (
    <section className="flex flex-col gap-3 rounded-card bg-nori p-7 text-rice shadow-plate-rest">
      <p className="flex items-center gap-2 text-sm font-medium text-rice/80">
        <span className="size-2.5 shrink-0 rounded-full bg-salmon" />
        Next up: {session.label} · {formatDay(session.start)} · {formatTime(session.start)} your
        time
      </p>
      <p className="font-heading text-2xl text-balance tabular-nums sm:text-3xl md:text-4xl">
        {formatCountdown(session.start - now)}
      </p>
      <p className="text-xs text-rice/60">{session.raceName}</p>
    </section>
  )
}
