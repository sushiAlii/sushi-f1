import { describe, expect, it } from 'vitest'
import { season } from './fixtures'
import { LIVE_BUFFER_MS, RESULT_WINDOW_MS, getSessionStatus, getTrackerState } from './tracker'

const MINUTE = 60_000

const sessionNamed = (id: string) => {
  const found = season.find((session) => session.id === id)
  if (!found) throw new Error(`Missing fixture session ${id}`)
  return found
}

const qualifying = sessionNamed('2026-21-Qualifying')
const vegasRace = sessionNamed('2026-21-Race')
const practiceOne = sessionNamed('2026-21-FP1')
const abuDhabiPracticeOne = sessionNamed('2026-22-FP1')

describe('getTrackerState', () => {
  it('is upcoming before the first session of the season', () => {
    const state = getTrackerState(season, practiceOne.start - 3 * 24 * 60 * MINUTE)

    expect(state).toMatchObject({ kind: 'upcoming', next: { id: practiceOne.id } })
  })

  it('lists the weekend of the next session', () => {
    const state = getTrackerState(season, practiceOne.start - MINUTE)

    expect(state.kind === 'upcoming' && state.weekend).toHaveLength(5)
  })

  it('is live from the session start with elapsed time', () => {
    const state = getTrackerState(season, qualifying.start + 32 * MINUTE)

    expect(state).toMatchObject({
      kind: 'live',
      session: { id: qualifying.id },
      elapsedMs: 32 * MINUTE,
    })
  })

  it('is live exactly at the start instant', () => {
    expect(getTrackerState(season, qualifying.start).kind).toBe('live')
  })

  it('stays live through the buffer after the estimated end', () => {
    const state = getTrackerState(season, qualifying.end + LIVE_BUFFER_MS - 1)

    expect(state).toMatchObject({ kind: 'live', session: { id: qualifying.id } })
  })

  it('shows finished results for a session once the buffer has passed', () => {
    const state = getTrackerState(season, qualifying.end + LIVE_BUFFER_MS)

    expect(state).toMatchObject({
      kind: 'finished',
      session: { id: qualifying.id },
      next: { id: vegasRace.id },
    })
  })

  it('goes back to upcoming for sessions without results once their buffer has passed', () => {
    const state = getTrackerState(season, practiceOne.end + LIVE_BUFFER_MS)

    expect(state).toMatchObject({ kind: 'upcoming', next: { kind: 'FP2' } })
  })

  it('returns to upcoming after the result window closes', () => {
    const now = qualifying.end + LIVE_BUFFER_MS + RESULT_WINDOW_MS
    const state = getTrackerState(
      season.filter(({ id }) => id !== vegasRace.id),
      now,
    )

    expect(state).toMatchObject({ kind: 'upcoming', next: { id: abuDhabiPracticeOne.id } })
  })

  it('counts down to the next round after a race finishes', () => {
    const state = getTrackerState(season, vegasRace.end + LIVE_BUFFER_MS + 10 * MINUTE)

    expect(state).toMatchObject({
      kind: 'finished',
      session: { id: vegasRace.id },
      next: { id: abuDhabiPracticeOne.id },
    })
  })

  it('has no next session after the final race of the season', () => {
    const lastRace = season.at(-1)!
    const state = getTrackerState(season, lastRace.end + LIVE_BUFFER_MS + MINUTE)

    expect(state).toMatchObject({ kind: 'finished', session: { id: lastRace.id } })
    expect(state.kind === 'finished' && state.next).toBeUndefined()
  })

  it('is idle when nothing is scheduled', () => {
    expect(getTrackerState([], Date.now())).toEqual({ kind: 'idle' })
  })

  it('is idle long after the season has ended', () => {
    const lastRace = season.at(-1)!

    expect(getTrackerState(season, lastRace.end + 30 * 24 * 60 * MINUTE)).toEqual({ kind: 'idle' })
  })
})

describe('getSessionStatus', () => {
  const next = abuDhabiPracticeOne

  it('classifies a session by where now falls', () => {
    expect(getSessionStatus(qualifying, qualifying.end + LIVE_BUFFER_MS, next)).toBe('finished')
    expect(getSessionStatus(qualifying, qualifying.start + MINUTE, next)).toBe('live')
    expect(getSessionStatus(next, qualifying.start, next)).toBe('next')
    expect(getSessionStatus(sessionNamed('2026-22-Race'), qualifying.start, next)).toBe('upcoming')
  })
})
