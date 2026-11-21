import { fetchRaces, type ApiDriver, type ApiQualifyingResult, type ApiRaceResult } from './jolpica'
import type { Session, SessionKind } from './sessions'

export interface ResultRow {
  position: number
  driver: string
  team: string
  detail: string
}

type ResultLoader = (season: number, round: number) => Promise<ResultRow[]>

const driverName = ({ givenName, familyName }: ApiDriver) => `${givenName} ${familyName}`

const fromQualifying = (result: ApiQualifyingResult): ResultRow => ({
  position: Number(result.position),
  driver: driverName(result.Driver),
  team: result.Constructor.name,
  detail: result.Q3 || result.Q2 || result.Q1 || '',
})

const fromRace = (result: ApiRaceResult): ResultRow => ({
  position: Number(result.position),
  driver: driverName(result.Driver),
  team: result.Constructor.name,
  detail: result.Time?.time ?? result.status,
})

const loadQualifying: ResultLoader = async (season, round) => {
  const races = await fetchRaces<{ QualifyingResults: ApiQualifyingResult[] }>(
    `/${season}/${round}/qualifying.json`,
  )
  return (races[0]?.QualifyingResults ?? []).map(fromQualifying)
}

const loadRaceLike =
  (resource: 'results' | 'sprint', key: 'Results' | 'SprintResults'): ResultLoader =>
  async (season, round) => {
    const races = await fetchRaces<Record<string, ApiRaceResult[]>>(
      `/${season}/${round}/${resource}.json`,
    )
    return (races[0]?.[key] ?? []).map(fromRace)
  }

const LOADERS: Partial<Record<SessionKind, ResultLoader>> = {
  Qualifying: loadQualifying,
  Sprint: loadRaceLike('sprint', 'SprintResults'),
  Race: loadRaceLike('results', 'Results'),
}

export const getSessionResults = async ({ kind, season, round }: Session) =>
  (await LOADERS[kind]?.(season, round)) ?? []
