# sushi-f1 (Sushi Paddock)

Personal, unofficial F1 session tracker: shows the next session in the user's local time. Web-only SPA (Vite + React + TypeScript), no SSR/SEO.

## Stack

- Package manager is **bun**, not npm or yarn.
- Tailwind CSS v4. Design tokens live in `src/index.css` under `@theme`, ported from `~/dev/portfolio/src/app/globals.css`. Re-sync from there rather than diverging. Light mode only for now.
- TanStack Router (file-based, `src/routes/`, generated `src/routeTree.gen.ts` is committed) and TanStack Query.
- Zustand is not installed yet. If shared state is ever needed, use Zustand and expose it only through custom hooks in `src/hooks/`.
- ESLint (flat config) + Prettier. Run `bun run lint`, `bun run format:check`, `bun run typecheck`, `bun run test` before committing.
- TypeScript is pinned to 6.0 because typescript-eslint does not support 7 yet.

## Data

Jolpica-F1 (`https://api.jolpi.ca/ergast/f1`), anonymous, browser-callable. Times are UTC and are converted in the browser. The API has no session end times, so durations are estimated in `src/lib/sessions.ts`, with a live buffer and result window in `src/lib/tracker.ts`.

## Routes

- `/` live tracker (upcoming, live, finished, pending states). Supports `?now=`.
- `/races` current-season calendar; `/races/$round` one weekend: sessions plus results for finished qualifying, sprint and race (newest first). `round` is parsed to a number; unknown rounds show "Race not found".
- `/standings` drivers' standings, `/standings?tab=constructors` constructors'. Both show "After round N" from the API.
- Navigation lives in `AppNav` inside `AppShell` (`__root.tsx`). Active links style via `data-[status=active]` variants, not `activeProps`, because Tailwind utility order let `border-transparent` win.
- Practice sessions never have results (Jolpica has none; OpenF1 blocks API access during live sessions), so they show times only.

## Code style

- No comments. Code should be self-descriptive through naming; extract a well-named function or variable instead.
- Favor declarative React: composition and derived state over imperative step-by-step logic.
- Each server request gets its own hook in `src/hooks/` that returns its `useQuery` result directly, never wrapped in a custom object. Consumers use the native `data`/`isPending`/`isError`/`refetch` surface. Shared cache keys live in `src/lib/queryKeys.ts`.
- Pure logic (sessions, tracker state, time formatting) stays in `src/lib/` with Vitest tests next to it.
- Group related files into one commit; keep unrelated changes in separate commits.

## Product rules

- Always show the user's time zone and convert every time to local time.
- Countdown: a day or more away shows only days ("in 5 days"); under a day shows hours, minutes, seconds.
- Do not add content the API cannot provide (track stats, lap counts, weather, flags, session durations, alerts). The designs in Stitch contain such invented labels; ignore them.
- `?now=<ISO timestamp>` simulates the clock to preview live, finished and pending states.
