import type { SessionKind } from './sessions'

export const queryKeys = {
  schedule: ['schedule', 'current'] as const,
  results: (season: number, round: number, kind: SessionKind) =>
    ['results', season, round, kind] as const,
  driverStandings: ['standings', 'drivers', 'current'] as const,
  constructorStandings: ['standings', 'constructors', 'current'] as const,
}
