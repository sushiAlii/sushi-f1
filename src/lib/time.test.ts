import { describe, expect, it } from 'vitest'
import { formatCountdown, formatDay, formatElapsed, formatTime, getTimezoneLabel } from './time'

const HOUR = 3_600_000
const MINUTE = 60_000
const DAY = 24 * HOUR

describe('formatCountdown', () => {
  it('shows only whole days when a day or more remains', () => {
    expect(formatCountdown(5 * DAY + 12 * HOUR)).toBe('in 5 days')
  })

  it('uses the singular for exactly one day', () => {
    expect(formatCountdown(DAY)).toBe('in 1 day')
  })

  it('switches to hours, minutes and seconds under a day', () => {
    expect(formatCountdown(DAY - 1000)).toBe('in 23 hours 59 min 59 sec')
    expect(formatCountdown(21 * HOUR + 4 * MINUTE + 12_000)).toBe('in 21 hours 4 min 12 sec')
  })

  it('uses the singular for one hour', () => {
    expect(formatCountdown(HOUR)).toBe('in 1 hour 0 min 0 sec')
  })

  it('drops leading zero units', () => {
    expect(formatCountdown(4 * MINUTE + 31_000)).toBe('in 4 min 31 sec')
    expect(formatCountdown(5000)).toBe('in 5 sec')
  })

  it('never goes negative', () => {
    expect(formatCountdown(-5000)).toBe('in 0 sec')
  })
})

describe('formatElapsed', () => {
  it('shows minutes under an hour', () => {
    expect(formatElapsed(32 * MINUTE + 10_000)).toBe('32 min in')
  })

  it('shows hours and minutes past an hour', () => {
    expect(formatElapsed(HOUR + 5 * MINUTE)).toBe('1 hr 5 min in')
  })
})

describe('local time formatting', () => {
  const qualifying = Date.parse('2026-11-21T04:00:00Z')

  it('converts a UTC instant to the requested time zone', () => {
    expect(formatDay(qualifying, 'Asia/Kolkata')).toBe('Sat, 21 Nov')
    expect(formatTime(qualifying, 'Asia/Kolkata')).toBe('9:30 AM')
  })

  it('rolls the day over when the zone is ahead of UTC', () => {
    expect(formatDay(qualifying, 'Pacific/Auckland')).toBe('Sat, 21 Nov')
    expect(formatTime(qualifying, 'Pacific/Auckland')).toBe('5:00 PM')
    expect(formatDay(qualifying, 'America/Los_Angeles')).toBe('Fri, 20 Nov')
    expect(formatTime(qualifying, 'America/Los_Angeles')).toBe('8:00 PM')
  })
})

describe('getTimezoneLabel', () => {
  const instant = Date.parse('2026-11-21T04:00:00Z')

  it('combines the abbreviation with a compact UTC offset', () => {
    expect(getTimezoneLabel(instant, 'Asia/Kolkata', 'en-IN')).toBe('IST (UTC+5:30)')
    expect(getTimezoneLabel(instant, 'America/New_York', 'en-US')).toBe('EST (UTC-5)')
  })

  it('falls back to the city when no abbreviation exists', () => {
    expect(getTimezoneLabel(instant, 'Asia/Kolkata', 'en-US')).toBe('Kolkata (UTC+5:30)')
  })

  it('collapses UTC itself', () => {
    expect(getTimezoneLabel(instant, 'UTC', 'en-US')).toBe('UTC')
  })
})
