import { useQuery } from '@tanstack/react-query'
import { getSchedule } from '../lib/jolpica'
import { queryKeys } from '../lib/queryKeys'
import { toSessions } from '../lib/sessions'

const SCHEDULE_STALE_MS = 30 * 60_000

export const useGetSchedule = () =>
  useQuery({
    queryKey: queryKeys.schedule,
    queryFn: getSchedule,
    select: toSessions,
    staleTime: SCHEDULE_STALE_MS,
  })
