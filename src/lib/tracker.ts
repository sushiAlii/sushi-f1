import type { Session, Weekend } from './sessions'

export const LIVE_BUFFER_MS = 30 * 60_000
export const RESULT_WINDOW_MS = 24 * 60 * 60_000

export type SessionStatus = 'finished' | 'live' | 'next' | 'upcoming'

export type TrackerState =
  | { kind: 'live'; session: Session; weekend: Session[]; elapsedMs: number }
  | { kind: 'finished'; session: Session; next?: Session; weekend: Session[] }
  | { kind: 'upcoming'; next: Session; weekend: Session[] }
  | { kind: 'idle' }

export const liveUntil = (session: Session) => session.end + LIVE_BUFFER_MS

const weekendOf = (sessions: Session[], target: Session) =>
  sessions.filter(({ season, round }) => season === target.season && round === target.round)

export const getTrackerState = (sessions: Session[], now: number): TrackerState => {
  const live = sessions.find((session) => session.start <= now && now < liveUntil(session))
  const next = sessions.find(({ start }) => start > now)
  const finished = sessions.findLast(
    (session) =>
      session.hasResults &&
      liveUntil(session) <= now &&
      now < liveUntil(session) + RESULT_WINDOW_MS,
  )

  if (live) {
    return {
      kind: 'live',
      session: live,
      weekend: weekendOf(sessions, live),
      elapsedMs: now - live.start,
    }
  }

  if (finished) {
    return { kind: 'finished', session: finished, next, weekend: weekendOf(sessions, finished) }
  }

  if (next) {
    return { kind: 'upcoming', next, weekend: weekendOf(sessions, next) }
  }

  return { kind: 'idle' }
}

export const getSessionStatus = (session: Session, now: number, next?: Session): SessionStatus => {
  if (now >= liveUntil(session)) return 'finished'
  if (now >= session.start) return 'live'
  return session.id === next?.id ? 'next' : 'upcoming'
}

export type WeekendStatus = SessionStatus | 'in-progress'

export const getWeekendStatus = (weekend: Weekend, now: number, next?: Weekend): WeekendStatus => {
  const lastSession = weekend.sessions[weekend.sessions.length - 1]

  if (now >= liveUntil(lastSession)) return 'finished'
  if (weekend.sessions.some((session) => getSessionStatus(session, now) === 'live')) return 'live'
  if (now >= weekend.start) return 'in-progress'
  return weekend.season === next?.season && weekend.round === next.round ? 'next' : 'upcoming'
}
