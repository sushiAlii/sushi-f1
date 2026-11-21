import { getTrackerState } from '../lib/tracker'
import { useGetSchedule } from './useGetSchedule'
import { useNow } from './useNow'

export const useTracker = (simulatedNow?: number) => {
  const { data: sessions, isPending, isError, refetch } = useGetSchedule()
  const now = useNow(simulatedNow)

  return {
    now,
    state: sessions ? getTrackerState(sessions, now) : undefined,
    isPending,
    isError,
    refetch,
  }
}
