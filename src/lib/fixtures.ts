import type { ApiRace } from './jolpica'
import { toSessions } from './sessions'

export const vegasRace: ApiRace = {
  season: '2026',
  round: '21',
  raceName: 'Las Vegas Grand Prix',
  Circuit: { circuitName: 'Las Vegas Strip Street Circuit' },
  date: '2026-11-22',
  time: '04:00:00Z',
  FirstPractice: { date: '2026-11-20', time: '00:30:00Z' },
  SecondPractice: { date: '2026-11-20', time: '04:00:00Z' },
  ThirdPractice: { date: '2026-11-21', time: '00:30:00Z' },
  Qualifying: { date: '2026-11-21', time: '04:00:00Z' },
}

export const abuDhabiRace: ApiRace = {
  season: '2026',
  round: '22',
  raceName: 'Abu Dhabi Grand Prix',
  Circuit: { circuitName: 'Yas Marina Circuit' },
  date: '2026-12-06',
  time: '13:00:00Z',
  FirstPractice: { date: '2026-12-04', time: '09:30:00Z' },
  SecondPractice: { date: '2026-12-04', time: '13:00:00Z' },
  ThirdPractice: { date: '2026-12-05', time: '10:30:00Z' },
  Qualifying: { date: '2026-12-05', time: '14:00:00Z' },
}

export const sprintRace: ApiRace = {
  season: '2026',
  round: '6',
  raceName: 'Miami Grand Prix',
  Circuit: { circuitName: 'Miami International Autodrome' },
  date: '2026-05-03',
  time: '20:00:00Z',
  FirstPractice: { date: '2026-05-01', time: '16:30:00Z' },
  SprintQualifying: { date: '2026-05-01', time: '20:30:00Z' },
  Sprint: { date: '2026-05-02', time: '16:00:00Z' },
  Qualifying: { date: '2026-05-02', time: '20:00:00Z' },
}

export const season = toSessions([vegasRace, abuDhabiRace])
