import type { ApiConstructorStanding, ApiDriverStanding, ApiStandings } from './jolpica'

export type StandingsTab = 'drivers' | 'constructors'

export interface Standings<TRow> {
  round: number
  rows: TRow[]
}

export interface DriverStanding {
  position: number
  driver: string
  team: string
  points: number
  wins: number
}

export interface ConstructorStanding {
  position: number
  team: string
  points: number
  wins: number
}

const toDriverStanding = (standing: ApiDriverStanding): DriverStanding => ({
  position: Number(standing.position),
  driver: `${standing.Driver.givenName} ${standing.Driver.familyName}`,
  team: standing.Constructors.at(-1)?.name ?? '',
  points: Number(standing.points),
  wins: Number(standing.wins),
})

const toConstructorStanding = (standing: ApiConstructorStanding): ConstructorStanding => ({
  position: Number(standing.position),
  team: standing.Constructor.name,
  points: Number(standing.points),
  wins: Number(standing.wins),
})

export const toDriverStandings = ({
  round,
  rows,
}: ApiStandings<ApiDriverStanding>): Standings<DriverStanding> => ({
  round,
  rows: rows.map(toDriverStanding),
})

export const toConstructorStandings = ({
  round,
  rows,
}: ApiStandings<ApiConstructorStanding>): Standings<ConstructorStanding> => ({
  round,
  rows: rows.map(toConstructorStanding),
})
