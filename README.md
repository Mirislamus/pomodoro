# Pomodoro

## Development

```bash
bun install
bun run dev
```

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
bun run check:js-budget
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
