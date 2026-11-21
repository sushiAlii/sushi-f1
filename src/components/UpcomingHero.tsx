import { formatCountdown, formatDay, formatTime } from '../lib/time'
import type { Session } from '../lib/sessions'
import { InfoBox } from './InfoBox'
import { PinIcon } from './icons'

interface UpcomingHeroProps {
  session: Session
  now: number
}

export function UpcomingHero({ session, now }: UpcomingHeroProps) {
  return (
    <section className="flex flex-col gap-6 rounded-card bg-nori p-7 text-rice shadow-plate-rest md:p-9">
      <span className="w-fit rounded-pill bg-salmon px-3 py-1 text-xs font-bold tracking-wider text-nori uppercase">
        {session.label}
      </span>
      <div className="flex flex-col gap-2">
        <h2 className="font-heading text-4xl leading-tight md:text-5xl">{session.raceName}</h2>
        <p className="flex items-center gap-1.5 text-sm text-rice/70">
          <PinIcon className="size-4 text-salmon" />
          {session.circuitName}
        </p>
      </div>
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-1">
        <InfoBox label="Your local time">
          <p className="text-xl font-bold">
            {formatDay(session.start)} ·{' '}
            <span className="text-salmon tabular-nums">{formatTime(session.start)}</span>
          </p>
        </InfoBox>
        <InfoBox label="Countdown">
          <p className="font-heading text-2xl text-balance tabular-nums sm:text-3xl">
            {formatCountdown(session.start - now)}
          </p>
        </InfoBox>
      </div>
    </section>
  )
}
