import { useQuery } from '@tanstack/react-query'
import { getDriverStandings } from '../lib/jolpica'
import { queryKeys } from '../lib/queryKeys'
import { toDriverStandings } from '../lib/standings'

const STANDINGS_STALE_MS = 10 * 60_000

export const useGetDriverStandings = () =>
  useQuery({
    queryKey: queryKeys.driverStandings,
    queryFn: getDriverStandings,
    select: toDriverStandings,
    staleTime: STANDINGS_STALE_MS,
  })
