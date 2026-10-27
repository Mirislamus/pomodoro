# Pomodoro

## Development

```bash
bun install
bun run dev
```

## Project structure

- `src/pages/[...lang]` — one Astro route per view; the default locale is served from the site root, others under `/<locale>/`.
- `src/app/AppShell.tsx` — the React island, persisted across client-side navigations.
- `src/views` — page-level compositions (`TimerView`, `SettingsView`).
- `src/components` — feature components; `src/shared` — design-system primitives.
- `src/hooks/usePomodoroTimer.ts` — the timer state machine: countdown, stage transitions, sounds, notifications, persistence.
- `src/consts/stages.ts` — per-stage config (label, colors, duration key) and cycle rules.
- `src/stores` — persisted Zustand stores; stored data is sanitized and migrated on load.
- `src/theme` — Chakra UI tokens and recipes.

## Checks

Install Playwright browsers once:

```bash
bunx playwright install
```

Run project checks:

```bash
bun run typegen
bun run typecheck
bun run lint
bun run build
bun run audit
bun run test:e2e
bun run test:a11y
```

Update Playwright screenshots only after an intentional UI change:

```bash
bun run test:e2e:update
```

## CI and deployment

Pull requests to `master` run all checks and upload the Playwright report. A push to `master` deploys the verified `dist` artifact to the `gh-pages` branch.
