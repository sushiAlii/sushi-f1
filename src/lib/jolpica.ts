const BASE_URL = 'https://api.jolpi.ca/ergast/f1'

export interface ApiSlot {
  date: string
  time?: string
}

export interface ApiRace {
  season: string
  round: string
  raceName: string
  Circuit: { circuitName: string }
  date: string
  time?: string
  FirstPractice?: ApiSlot
  SecondPractice?: ApiSlot
  ThirdPractice?: ApiSlot
  SprintQualifying?: ApiSlot
  Sprint?: ApiSlot
  Qualifying?: ApiSlot
}

export interface ApiDriver {
  givenName: string
  familyName: string
}

export interface ApiConstructor {
  name: string
}

export interface ApiQualifyingResult {
  position: string
  Driver: ApiDriver
  Constructor: ApiConstructor
  Q1?: string
  Q2?: string
  Q3?: string
}

export interface ApiRaceResult {
  position: string
  Driver: ApiDriver
  Constructor: ApiConstructor
  status: string
  Time?: { time: string }
}

export interface ApiDriverStanding {
  position: string
  points: string
  wins: string
  Driver: ApiDriver
  Constructors: ApiConstructor[]
}

export interface ApiConstructorStanding {
  position: string
  points: string
  wins: string
  Constructor: ApiConstructor
}

interface ApiStandingsList {
  DriverStandings?: ApiDriverStanding[]
  ConstructorStandings?: ApiConstructorStanding[]
}

interface RaceTableResponse<TRace> {
  MRData: { RaceTable: { Races: TRace[] } }
}

interface StandingsTableResponse {
  MRData: { StandingsTable: { round?: string; StandingsLists: ApiStandingsList[] } }
}

export interface ApiStandings<TRow> {
  round: number
  rows: TRow[]
}

const fetchJson = async <TBody>(path: string): Promise<TBody> => {
  const response = await fetch(`${BASE_URL}${path}`)

  if (!response.ok) {
    throw new Error(`Jolpica request failed with status ${response.status}`)
  }

  return response.json()
}

const fetchStandingsList = async (path: string) => {
  const { MRData }: StandingsTableResponse = await fetchJson(path)
  return {
    round: Number(MRData.StandingsTable.round ?? 0),
    list: MRData.StandingsTable.StandingsLists[0],
  }
}

export const fetchRaces = async <TRace>(path: string): Promise<TRace[]> => {
  const body: RaceTableResponse<TRace> = await fetchJson(path)
  return body.MRData.RaceTable.Races
}

export const getSchedule = () => fetchRaces<ApiRace>('/current.json')

export const getDriverStandings = async (): Promise<ApiStandings<ApiDriverStanding>> => {
  const { round, list } = await fetchStandingsList('/current/driverstandings.json')
  return { round, rows: list?.DriverStandings ?? [] }
}

export const getConstructorStandings = async (): Promise<ApiStandings<ApiConstructorStanding>> => {
  const { round, list } = await fetchStandingsList('/current/constructorstandings.json')
  return { round, rows: list?.ConstructorStandings ?? [] }
}
