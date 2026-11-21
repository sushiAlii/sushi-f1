import { formatElapsed, formatTime } from '../lib/time'
import type { Session } from '../lib/sessions'
import { InfoBox } from './InfoBox'
import { PinIcon } from './icons'

interface LiveHeroProps {
  session: Session
  elapsedMs: number
}

export function LiveHero({ session, elapsedMs }: LiveHeroProps) {
  return (
    <section className="flex flex-col gap-6 rounded-card bg-nori p-7 text-rice shadow-plate-rest md:p-9">
      <span className="flex w-fit items-center gap-2 rounded-pill bg-white/10 px-3.5 py-1.5 text-xs font-bold tracking-wider text-salmon uppercase">
        <span className="relative flex size-2.5">
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-salmon opacity-75" />
          <span className="relative inline-flex size-2.5 rounded-full bg-salmon" />
        </span>
        Live now
      </span>
      <div className="flex flex-col gap-3">
        <h2 className="font-heading text-4xl leading-tight md:text-5xl">
          {session.label} is happening now
        </h2>
        <p className="flex items-center gap-1.5 text-sm text-rice/70">
          <PinIcon className="size-4 shrink-0 text-salmon" />
          {session.raceName} · {session.circuitName}
        </p>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <InfoBox label="Started at">
          <p className="font-heading text-2xl tabular-nums md:text-3xl">
            {formatTime(session.start)}
          </p>
          <p className="text-xs text-rice/60">Your local time</p>
        </InfoBox>
        <InfoBox label="Elapsed">
          <p className="font-heading text-2xl text-salmon tabular-nums md:text-3xl">
            {formatElapsed(elapsedMs)}
          </p>
        </InfoBox>
      </div>
    </section>
  )
}
