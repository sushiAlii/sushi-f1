import { describe, expect, it } from 'vitest'
import { season } from './fixtures'
import { groupWeekends } from './sessions'
import { LIVE_BUFFER_MS, getWeekendStatus } from './tracker'

const MINUTE = 60_000

const [vegas, abuDhabi] = groupWeekends(season)

const sessionOf = (weekend: typeof vegas, kind: string) => {
  const found = weekend.sessions.find((session) => session.kind === kind)
  if (!found) throw new Error(`Missing ${kind}`)
  return found
}

describe('groupWeekends', () => {
  it('groups sessions by round in calendar order', () => {
    expect(groupWeekends(season).map(({ round, sessions }) => [round, sessions.length])).toEqual([
      [21, 5],
      [22, 5],
    ])
  })

  it('exposes race details and the first and race start times', () => {
    expect(vegas).toMatchObject({
      season: 2026,
      round: 21,
      raceName: 'Las Vegas Grand Prix',
      circuitName: 'Las Vegas Strip Street Circuit',
      start: Date.parse('2026-11-20T00:30:00Z'),
      raceStart: Date.parse('2026-11-22T04:00:00Z'),
    })
  })

  it('returns nothing for an empty schedule', () => {
    expect(groupWeekends([])).toEqual([])
  })
})

describe('getWeekendStatus', () => {
  const qualifying = sessionOf(vegas, 'Qualifying')
  const race = sessionOf(vegas, 'Race')

  it('marks the first weekend that has not started as next and later ones as upcoming', () => {
    const now = vegas.start - 60 * MINUTE

    expect(getWeekendStatus(vegas, now, vegas)).toBe('next')
    expect(getWeekendStatus(abuDhabi, now, vegas)).toBe('upcoming')
  })

  it('is live while one of its sessions is on', () => {
    expect(getWeekendStatus(vegas, qualifying.start + 10 * MINUTE, abuDhabi)).toBe('live')
  })

  it('is in progress between sessions of a started weekend', () => {
    const betweenSessions = sessionOf(vegas, 'FP1').end + LIVE_BUFFER_MS + MINUTE

    expect(getWeekendStatus(vegas, betweenSessions, abuDhabi)).toBe('in-progress')
  })

  it('is finished once the last session and its buffer have passed', () => {
    expect(getWeekendStatus(vegas, race.end + LIVE_BUFFER_MS, abuDhabi)).toBe('finished')
    expect(getWeekendStatus(vegas, race.end + LIVE_BUFFER_MS - 1, abuDhabi)).toBe('live')
  })
})
