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

interface RaceTableResponse<TRace> {
  MRData: { RaceTable: { Races: TRace[] } }
}

export const fetchRaces = async <TRace>(path: string): Promise<TRace[]> => {
  const response = await fetch(`${BASE_URL}${path}`)

  if (!response.ok) {
    throw new Error(`Jolpica request failed with status ${response.status}`)
  }

  const body: RaceTableResponse<TRace> = await response.json()
  return body.MRData.RaceTable.Races
}

export const getSchedule = () => fetchRaces<ApiRace>('/current.json')
