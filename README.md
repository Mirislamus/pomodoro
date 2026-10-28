# Pomodoro

## Download

Desktop app (Tauri):

- **Windows** (10/11, x64): [Pomotomo-windows-x64-setup.exe](https://github.com/Mirislamus/pomodoro/releases/latest/download/Pomotomo-windows-x64-setup.exe)
- **macOS** (11+, Apple Silicon): [Pomotomo-macos-arm64.dmg](https://github.com/Mirislamus/pomodoro/releases/latest/download/Pomotomo-macos-arm64.dmg)

All versions are on the [Releases](https://github.com/Mirislamus/pomodoro/releases) page. Web version: [mirislamus.github.io/pomodoro](https://mirislamus.github.io/pomodoro/).

The builds are not code-signed yet, so the OS warns on first launch:

- Windows SmartScreen: **More info → Run anyway**.
- macOS: open the app once, then **System Settings → Privacy & Security → Open Anyway**. If macOS reports the app as damaged, run `xattr -cr /Applications/Pomotomo.app`.

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

## Desktop app

The desktop app wraps the same Astro build in [Tauri 2](https://tauri.app). Building it needs [Rust](https://www.rust-lang.org/tools/install) and the [Tauri prerequisites](https://tauri.app/start/prerequisites/) for your OS.

```bash
bun run desktop:dev
bun run desktop:build
```

The Tauri CLI sets `TAURI_ENV_*` variables, which switch `astro.config.ts` to the desktop build: served from `/`, no service worker, output in `dist-desktop`.

To publish a release, bump `version` in `package.json` and `src-tauri/Cargo.toml`, then push a matching tag:

```bash
git tag v0.1.0
git push origin v0.1.0
```

The `Release desktop apps` workflow builds the Windows installer and the Apple Silicon macOS `.dmg` and attaches them to the GitHub release under fixed names, so the download links above always point to the latest version.
