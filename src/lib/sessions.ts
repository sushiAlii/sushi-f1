import type { ApiRace, ApiSlot } from './jolpica'

export type SessionKind =
  'FP1' | 'FP2' | 'FP3' | 'SprintQualifying' | 'Sprint' | 'Qualifying' | 'Race'

export interface Session {
  id: string
  season: number
  round: number
  raceName: string
  circuitName: string
  kind: SessionKind
  label: string
  start: number
  end: number
  hasResults: boolean
}

const MINUTE = 60_000

const SESSION_META: Record<
  SessionKind,
  { label: string; durationMs: number; hasResults: boolean }
> = {
  FP1: { label: 'Practice 1', durationMs: 60 * MINUTE, hasResults: false },
  FP2: { label: 'Practice 2', durationMs: 60 * MINUTE, hasResults: false },
  FP3: { label: 'Practice 3', durationMs: 60 * MINUTE, hasResults: false },
  SprintQualifying: { label: 'Sprint Qualifying', durationMs: 45 * MINUTE, hasResults: false },
  Sprint: { label: 'Sprint', durationMs: 30 * MINUTE, hasResults: true },
  Qualifying: { label: 'Qualifying', durationMs: 60 * MINUTE, hasResults: true },
  Race: { label: 'Race', durationMs: 120 * MINUTE, hasResults: true },
}

const slotsOf = (race: ApiRace): [SessionKind, ApiSlot | undefined][] => [
  ['FP1', race.FirstPractice],
  ['FP2', race.SecondPractice],
  ['FP3', race.ThirdPractice],
  ['SprintQualifying', race.SprintQualifying],
  ['Sprint', race.Sprint],
  ['Qualifying', race.Qualifying],
  ['Race', { date: race.date, time: race.time }],
]

const toStart = (slot: ApiSlot) => Date.parse(`${slot.date}T${slot.time ?? '00:00:00Z'}`)

const buildSession = (race: ApiRace, kind: SessionKind, start: number): Session => ({
  id: `${race.season}-${race.round}-${kind}`,
  season: Number(race.season),
  round: Number(race.round),
  raceName: race.raceName,
  circuitName: race.Circuit.circuitName,
  kind,
  label: SESSION_META[kind].label,
  start,
  end: start + SESSION_META[kind].durationMs,
  hasResults: SESSION_META[kind].hasResults,
})

const toRaceSessions = (race: ApiRace): Session[] =>
  slotsOf(race).flatMap(([kind, slot]) => {
    if (!slot) return []
    const start = toStart(slot)
    return Number.isNaN(start) ? [] : [buildSession(race, kind, start)]
  })

export const toSessions = (races: ApiRace[]): Session[] =>
  races.flatMap(toRaceSessions).toSorted((a, b) => a.start - b.start)

export interface Weekend {
  season: number
  round: number
  raceName: string
  circuitName: string
  start: number
  raceStart: number
  sessions: Session[]
}

const toWeekend = (sessions: Session[]): Weekend => {
  const [first] = sessions
  const race = sessions.find(({ kind }) => kind === 'Race') ?? sessions[sessions.length - 1]

  return {
    season: first.season,
    round: first.round,
    raceName: first.raceName,
    circuitName: first.circuitName,
    start: first.start,
    raceStart: race.start,
    sessions,
  }
}

export const groupWeekends = (sessions: Session[]): Weekend[] => {
  const byRound = sessions.reduce((groups, session) => {
    const key = `${session.season}-${session.round}`
    return groups.set(key, [...(groups.get(key) ?? []), session])
  }, new Map<string, Session[]>())

  return [...byRound.values()].map(toWeekend)
}
