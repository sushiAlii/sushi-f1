import { describe, expect, it } from 'vitest'
import type { ApiConstructorStanding, ApiDriverStanding } from './jolpica'
import { toConstructorStandings, toDriverStandings } from './standings'

const antonelli: ApiDriverStanding = {
  position: '1',
  points: '390',
  wins: '9',
  Driver: { givenName: 'Andrea Kimi', familyName: 'Antonelli' },
  Constructors: [{ name: 'Mercedes' }],
}

const midSeasonSwap: ApiDriverStanding = {
  position: '14',
  points: '12',
  wins: '0',
  Driver: { givenName: 'Franco', familyName: 'Colapinto' },
  Constructors: [{ name: 'Williams' }, { name: 'Alpine' }],
}

const mercedes: ApiConstructorStanding = {
  position: '1',
  points: '652',
  wins: '12',
  Constructor: { name: 'Mercedes' },
}

describe('toDriverStandings', () => {
  it('flattens a driver standing into display fields with numeric values', () => {
    expect(toDriverStandings({ round: 20, rows: [antonelli] })).toEqual({
      round: 20,
      rows: [
        {
          position: 1,
          driver: 'Andrea Kimi Antonelli',
          team: 'Mercedes',
          points: 390,
          wins: 9,
        },
      ],
    })
  })

  it('uses the most recent team when a driver changed teams', () => {
    expect(toDriverStandings({ round: 20, rows: [midSeasonSwap] }).rows[0].team).toBe('Alpine')
  })

  it('returns no rows before the first round', () => {
    expect(toDriverStandings({ round: 0, rows: [] })).toEqual({ round: 0, rows: [] })
  })
})

describe('toConstructorStandings', () => {
  it('flattens a constructor standing with numeric values', () => {
    expect(toConstructorStandings({ round: 20, rows: [mercedes] })).toEqual({
      round: 20,
      rows: [{ position: 1, team: 'Mercedes', points: 652, wins: 12 }],
    })
  })
})
