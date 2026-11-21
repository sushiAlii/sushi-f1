import { useQuery } from '@tanstack/react-query'
import { getConstructorStandings } from '../lib/jolpica'
import { queryKeys } from '../lib/queryKeys'
import { toConstructorStandings } from '../lib/standings'

const STANDINGS_STALE_MS = 10 * 60_000

export const useGetConstructorStandings = () =>
  useQuery({
    queryKey: queryKeys.constructorStandings,
    queryFn: getConstructorStandings,
    select: toConstructorStandings,
    staleTime: STANDINGS_STALE_MS,
  })
