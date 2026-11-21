import { useQuery } from '@tanstack/react-query'
import { getSessionResults } from '../lib/results'
import type { Session } from '../lib/sessions'

const RESULTS_STALE_MS = 60_000
const PENDING_POLL_MS = 3 * 60_000

export const useGetSessionResults = ({ kind, season, round }: Session) =>
  useQuery({
    queryKey: ['results', season, round, kind],
    queryFn: () => getSessionResults({ kind, season, round }),
    staleTime: RESULTS_STALE_MS,
    refetchInterval: ({ state }) => (state.data?.length ? false : PENDING_POLL_MS),
  })
