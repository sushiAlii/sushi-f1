import { describe, expect, it } from 'vitest'
import { abuDhabiRace, season, sprintRace, vegasRace } from './fixtures'
import { toSessions } from './sessions'

describe('toSessions', () => {
  it('flattens a race weekend into chronologically ordered sessions', () => {
    expect(toSessions([vegasRace]).map(({ kind }) => kind)).toEqual([
      'FP1',
      'FP2',
      'FP3',
      'Qualifying',
      'Race',
    ])
  })

  it('keeps UTC start times and estimates the end from the session type', () => {
    const [practiceOne, , , qualifying, race] = toSessions([vegasRace])

    expect(practiceOne.start).toBe(Date.parse('2026-11-20T00:30:00Z'))
    expect(practiceOne.end - practiceOne.start).toBe(60 * 60_000)
    expect(qualifying.end - qualifying.start).toBe(60 * 60_000)
    expect(race.end - race.start).toBe(120 * 60_000)
  })

  it('includes sprint sessions and marks which sessions publish results', () => {
    const sessions = toSessions([sprintRace])

    expect(sessions.map(({ kind }) => kind)).toEqual([
      'FP1',
      'SprintQualifying',
      'Sprint',
      'Qualifying',
      'Race',
    ])
    expect(sessions.filter(({ hasResults }) => hasResults).map(({ kind }) => kind)).toEqual([
      'Sprint',
      'Qualifying',
      'Race',
    ])
  })

  it('orders sessions across rounds', () => {
    expect(season.map(({ round }) => round)).toEqual([21, 21, 21, 21, 21, 22, 22, 22, 22, 22])
  })

  it('falls back to midnight UTC when a session has no time', () => {
    const [race] = toSessions([
      {
        ...abuDhabiRace,
        FirstPractice: undefined,
        SecondPractice: undefined,
        ThirdPractice: undefined,
        Qualifying: undefined,
        time: undefined,
      },
    ])

    expect(race.start).toBe(Date.parse('2026-12-06T00:00:00Z'))
  })

  it('gives every session a stable unique id', () => {
    expect(new Set(season.map(({ id }) => id)).size).toBe(season.length)
  })
})
