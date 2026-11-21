import { useGetConstructorStandings } from '../hooks/useGetConstructorStandings'
import { RetryMessage } from './RetryMessage'
import { StandingsSection } from './StandingsSection'
import { StatusMessage } from './StatusMessage'

export function ConstructorStandings() {
  const { data, isPending, isError, refetch } = useGetConstructorStandings()

  if (isPending) return <StatusMessage title="Loading the standings" />

  if (!data) {
    return isError ? (
      <RetryMessage title="Couldn’t load the standings" onRetry={() => void refetch()} />
    ) : null
  }

  return (
    <StandingsSection
      round={data.round}
      nameHeader="Team"
      rows={data.rows.map(({ position, team, points, wins }) => ({
        position,
        name: team,
        points,
        wins,
      }))}
    />
  )
}
