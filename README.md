# Sushi Paddock

A personal, unofficial F1 session tracker. It answers one question: when is the next session, in **my** local time?

Not affiliated with Formula 1 or any racing entity.

## What it shows

- **Upcoming**: the next session (practice, sprint, qualifying or race) with its local date and time. A day or more away reads "in 5 days"; under a day reads "in 21 hours 4 min 12 sec".
- **Live**: when a session is on, "Qualifying is happening now" with start time and elapsed time.
- **Finished**: the session's results, then the countdown to whatever comes next. If the results haven't been published yet, it says so and checks again every few minutes.

- **Races**: the season calendar. Open any round to see its sessions and the results of its qualifying, sprint and race.
- **Standings**: the current drivers' and constructors' championship tables.

All times are converted from UTC to your browser's time zone, and the zone is always shown.

## Data

Schedule and results come from [Jolpica-F1](https://github.com/jolpica/jolpica-f1), the open Ergast successor. No API key or account is needed.

The API gives session start times only, so "live" is estimated from typical session lengths plus a short buffer.

## Development

```sh
bun install
bun run dev
```

| Script              | What it does              |
| ------------------- | ------------------------- |
| `bun run dev`       | Start the Vite dev server |
| `bun run build`     | Typecheck and build       |
| `bun run test`      | Run the Vitest suite      |
| `bun run lint`      | ESLint                    |
| `bun run format`    | Prettier                  |
| `bun run typecheck` | `tsc -b`                  |

To preview a state without waiting for it, pass a simulated clock: `/?now=2026-11-21T04:30:00Z`.

## Stack

Vite, React, TypeScript, Tailwind CSS v4 (design tokens in `src/index.css`), TanStack Router and Query.

## License

MIT
