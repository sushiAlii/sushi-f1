import { useState } from 'react'
import { useGetSessionResults } from '../hooks/useGetSessionResults'
import type { ResultRow } from '../lib/results'
import type { Session } from '../lib/sessions'
import { CheckIcon, HourglassIcon } from './icons'

interface ResultsCardProps {
  session: Session
}

const COMPACT_ROWS = 5
const FULL_PAGE_ROWS = 10

function PendingResults() {
  return (
    <div className="flex flex-col items-center gap-3 rounded-2xl bg-canvas/60 px-6 py-10 text-center">
      <span className="flex size-14 items-center justify-center rounded-full bg-belt-1/40 text-deep">
        <HourglassIcon className="size-6" />
      </span>
      <p className="font-heading text-xl">Results coming soon</p>
      <p className="text-sm text-ink-soft">Checking again shortly</p>
    </div>
  )
}

function FailedResults({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-2xl bg-canvas/60 px-6 py-10 text-center">
      <p className="font-heading text-xl">Couldn’t load the results</p>
      <button
        type="button"
        onClick={onRetry}
        className="rounded-pill bg-salmon px-4 py-2 text-sm font-bold text-nori"
      >
        Try again
      </button>
    </div>
  )
}

function ResultRowItem({ row, hiddenOnCompact }: { row: ResultRow; hiddenOnCompact: boolean }) {
  return (
    <li
      className={`items-center gap-3 rounded-xl p-2.5 odd:bg-canvas/50 ${hiddenOnCompact ? 'hidden lg:flex' : 'flex'}`}
    >
      <span
        className={`flex size-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${row.position === 1 ? 'bg-salmon text-nori' : 'bg-belt-1/40 text-ink'}`}
      >
        {row.position}
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-bold">{row.driver}</p>
        <p className="truncate text-xs text-ink-soft">{row.team}</p>
      </div>
      <span className="text-sm font-semibold tabular-nums">{row.detail}</span>
    </li>
  )
}

export function ResultsCard({ session }: ResultsCardProps) {
  const { data, isError, refetch } = useGetSessionResults(session)
  const [expanded, setExpanded] = useState(false)
  const rows = data ?? []
  const visibleRows = expanded ? rows : rows.slice(0, FULL_PAGE_ROWS)

  return (
    <section className="flex flex-col gap-5 rounded-card bg-card p-6 shadow-plate-rest md:p-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="font-heading text-3xl">{session.label}</h2>
          <p className="text-sm text-ink-soft">{session.raceName}</p>
        </div>
        <span className="flex shrink-0 items-center gap-1.5 rounded-pill bg-sage/15 px-3 py-1 text-xs font-semibold text-sage-deep">
          <CheckIcon className="size-3.5" />
          Finished
        </span>
      </div>

      {isError && rows.length === 0 && <FailedResults onRetry={() => void refetch()} />}
      {!isError && rows.length === 0 && <PendingResults />}
      {rows.length > 0 && (
        <>
          <ol className="flex flex-col gap-1">
            {visibleRows.map((row, index) => (
              <ResultRowItem
                key={row.position}
                row={row}
                hiddenOnCompact={!expanded && index >= COMPACT_ROWS}
              />
            ))}
          </ol>
          {rows.length > COMPACT_ROWS && (
            <button
              type="button"
              onClick={() => setExpanded((current) => !current)}
              className="w-fit text-sm font-semibold text-deep underline-offset-4 hover:underline"
            >
              {expanded ? 'Show less' : 'Show full results'}
            </button>
          )}
        </>
      )}
    </section>
  )
}
