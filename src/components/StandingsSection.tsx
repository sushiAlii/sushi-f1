import { StatusMessage } from './StatusMessage'

export interface StandingRow {
  position: number
  name: string
  team?: string
  points: number
  wins: number
}

interface StandingsSectionProps {
  round: number
  rows: StandingRow[]
  nameHeader: string
}

const POSITION_BADGES: Record<number, string> = {
  1: 'bg-salmon text-nori',
  2: 'bg-belt-1/40 text-ink',
  3: 'bg-belt-1/40 text-ink',
}

function PositionBadge({ position }: { position: number }) {
  return (
    <span
      className={`inline-flex size-8 items-center justify-center rounded-full text-sm font-bold tabular-nums ${POSITION_BADGES[position] ?? 'text-ink-soft'}`}
    >
      {position}
    </span>
  )
}

export function StandingsSection({ round, rows, nameHeader }: StandingsSectionProps) {
  const hasTeam = rows.some(({ team }) => team !== undefined)

  if (rows.length === 0) {
    return (
      <StatusMessage
        title="No standings yet"
        body="The championship table appears after the first race of the season."
      />
    )
  }

  return (
    <>
      <p className="text-xs font-bold tracking-wider text-deep uppercase">After round {round}</p>
      <div className="overflow-hidden rounded-card bg-card shadow-plate-rest">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-canvas/50 text-xs font-bold tracking-wider text-ink-faint uppercase">
              <th className="w-20 py-4 pl-4 md:pl-8">Pos</th>
              <th className="py-4">{nameHeader}</th>
              {hasTeam && <th className="hidden py-4 md:table-cell">Team</th>}
              <th className="py-4 pl-3 text-right">Pts</th>
              <th className="py-4 pr-4 pl-3 text-right md:pr-8">Wins</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {rows.map((row) => (
              <tr key={row.position}>
                <td className="py-3 pl-4 md:pl-8">
                  <PositionBadge position={row.position} />
                </td>
                <td className="py-3 pr-2">
                  <span className="font-bold">{row.name}</span>
                  {row.team && (
                    <span className="block text-xs text-ink-soft md:hidden">{row.team}</span>
                  )}
                </td>
                {hasTeam && <td className="hidden py-3 text-ink-soft md:table-cell">{row.team}</td>}
                <td className="py-3 pl-3 text-right font-bold tabular-nums">{row.points}</td>
                <td className="py-3 pr-4 pl-3 text-right tabular-nums md:pr-8">{row.wins}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
