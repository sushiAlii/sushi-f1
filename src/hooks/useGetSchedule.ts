import { useQuery } from '@tanstack/react-query'
import { getSchedule } from '../lib/jolpica'
import { toSessions } from '../lib/sessions'

const SCHEDULE_STALE_MS = 30 * 60_000

export const useGetSchedule = () =>
  useQuery({
    queryKey: ['schedule', 'current'],
    queryFn: getSchedule,
    select: toSessions,
    staleTime: SCHEDULE_STALE_MS,
  })
