import { useGetDriverStandings } from '../hooks/useGetDriverStandings'
import { RetryMessage } from './RetryMessage'
import { StandingsSection } from './StandingsSection'
import { StatusMessage } from './StatusMessage'

export function DriverStandings() {
  const { data, isPending, isError, refetch } = useGetDriverStandings()

  if (isPending) return <StatusMessage title="Loading the standings" />

  if (!data) {
    return isError ? (
      <RetryMessage title="Couldn’t load the standings" onRetry={() => void refetch()} />
    ) : null
  }

  return (
    <StandingsSection
      round={data.round}
      nameHeader="Driver"
      rows={data.rows.map(({ position, driver, team, points, wins }) => ({
        position,
        name: driver,
        team,
        points,
        wins,
      }))}
    />
  )
}
