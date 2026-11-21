const MINUTE_MS = 60_000
const HOUR_MS = 60 * MINUTE_MS
const DAY_MS = 24 * HOUR_MS

const formatters = new Map<string, Intl.DateTimeFormat>()

const getFormatter = (locale: string | undefined, options: Intl.DateTimeFormatOptions) => {
  const key = JSON.stringify([locale, options])
  const cached = formatters.get(key)
  if (cached) return cached
  const created = new Intl.DateTimeFormat(locale, options)
  formatters.set(key, created)
  return created
}

const pluralize = (count: number, unit: string) => `${count} ${unit}${count === 1 ? '' : 's'}`

export const formatCountdown = (remainingMs: number) => {
  const remaining = Math.max(0, remainingMs)
  const days = Math.floor(remaining / DAY_MS)

  if (days >= 1) return `in ${pluralize(days, 'day')}`

  const hours = Math.floor(remaining / HOUR_MS)
  const minutes = Math.floor((remaining % HOUR_MS) / MINUTE_MS)
  const seconds = Math.floor((remaining % MINUTE_MS) / 1000)

  return `in ${pluralize(hours, 'hour')} ${minutes} min ${seconds} sec`
}

export const formatElapsed = (elapsedMs: number) => {
  const totalMinutes = Math.max(0, Math.floor(elapsedMs / MINUTE_MS))
  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60

  return hours === 0 ? `${minutes} min in` : `${hours} hr ${minutes} min in`
}

export const formatDay = (timestamp: number, timeZone?: string) => {
  const parts = getFormatter('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    timeZone,
  }).formatToParts(timestamp)
  const part = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((candidate) => candidate.type === type)?.value ?? ''

  return `${part('weekday')}, ${part('day')} ${part('month')}`
}

export const formatTime = (timestamp: number, timeZone?: string) =>
  getFormatter('en-US', { hour: 'numeric', minute: '2-digit', timeZone })
    .format(timestamp)
    .replace(/\s/g, ' ')

const OFFSET_PATTERN = /^GMT(?:([+-])0?(\d{1,2})(?::(\d{2}))?)?$/

const formatOffset = (timestamp: number, timeZone?: string) => {
  const raw =
    getFormatter('en-US', { timeZone, timeZoneName: 'longOffset' })
      .formatToParts(timestamp)
      .find(({ type }) => type === 'timeZoneName')?.value ?? 'GMT'
  const match = OFFSET_PATTERN.exec(raw)

  if (!match?.[1]) return 'UTC'

  const [, sign, hours, minutes = '00'] = match
  if (Number(hours) === 0 && Number(minutes) === 0) return 'UTC'

  return `UTC${sign}${hours}${minutes === '00' ? '' : `:${minutes}`}`
}

const cityOf = (timeZone: string) => timeZone.split('/').at(-1)?.replaceAll('_', ' ') ?? timeZone

export const getTimezoneLabel = (timestamp: number, timeZone?: string, locale?: string) => {
  const offset = formatOffset(timestamp, timeZone)
  if (offset === 'UTC') return 'UTC'

  const resolvedZone = timeZone ?? getFormatter(undefined, {}).resolvedOptions().timeZone
  const shortName =
    getFormatter(locale, { timeZone, timeZoneName: 'short' })
      .formatToParts(timestamp)
      .find(({ type }) => type === 'timeZoneName')?.value ?? ''
  const name = /^(GMT|UTC)/.test(shortName) ? cityOf(resolvedZone) : shortName

  return `${name} (${offset})`
}
