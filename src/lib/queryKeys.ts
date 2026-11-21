import type { SessionKind } from './sessions'

export const queryKeys = {
  schedule: ['schedule', 'current'] as const,
  results: (season: number, round: number, kind: SessionKind) =>
    ['results', season, round, kind] as const,
}
