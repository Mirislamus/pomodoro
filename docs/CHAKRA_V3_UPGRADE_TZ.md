# ТЗ: обновление зависимостей и миграция Chakra UI v2 → v3

Статус: задачи 1–5 завершены локально; физическая проверка audio/notifications и Safari/iOS остаётся ручной.
Дата проверки версий: 2026-08-26.  
Рабочая ветка: `dev`.

## 1. Цель

Обновить прямые production- и dev-зависимости до последних взаимно совместимых стабильных версий, мигрировать `@chakra-ui/react` с `2.10.9` на `3.36.1` и сохранить текущие внешний вид, поведение и пользовательские данные 1:1.

Источник требований Chakra: официальный [migration guide v2 → v3](https://chakra-ui.com/docs/get-started/migration) и [installation guide](https://chakra-ui.com/docs/get-started/installation).

## 2. Обязательные ограничения

- Использовать только stable-релизы; не использовать `beta`, `rc`, `canary`.
- Если latest-пакеты несовместимы по peer dependencies, выбрать новейшую взаимно совместимую stable-комбинацию без `--force`.
- Не делать редизайн и не менять бизнес-логику. Допустимы только изменения для новых API, типизации, тестируемости и accessibility без визуального отличия.
- Форматировать только изменённые файлы.
- Работать непосредственно в `dev`; не создавать ветку, не коммитить, не пушить и не деплоить без отдельного подтверждения.
- Сохранить обычный `bun install` и `bun-version: latest`; не вводить `bun ci`/`--frozen-lockfile` и не фиксировать версию Bun.
- Lighthouse не добавлять.
- Посторонние baseline-баги документировать, но не исправлять, если они не блокируют миграцию.

## 3. Текущее состояние проекта

- Vite + React + TypeScript + Bun, публикация `dist` в `gh-pages`.
- `@chakra-ui/react` закреплён в `bun.lock` на `2.10.9`.
- Chakra v2 используется в provider/theme и 49 исходных файлах.
- Критичные пользовательские сценарии: таймер и стадии, настройки, светлая/тёмная тема, RU/EN/DE, звук, уведомления, drawers/menu/dialog, PWA и offline.
- Данные Zustand хранятся под ключами `settings-storage` и `session-storage`; язык — `i18nextLng` согласно текущей конфигурации detector; Chakra v2 хранит выбранную тему под `chakra-ui-color-mode`.
- Текущий workflow запускается только на `push` в `master`, выполняет build и публикует `./dist` через `peaceiris/actions-gh-pages@v4`.
- До задачи 1 локальный `node_modules` был неполон. Зависимости восстановлены обычным `bun install` из текущего `bun.lock`; baseline ниже снят после восстановления.

## 4. Целевые зависимости

Версии ниже проверены read-only-командами `bun outdated --latest` и `bun pm view <package> version` против официального npm registry. Непосредственно перед изменением `package.json` их следует проверить повторно: тег `latest` подвижен.

### 4.1 Production dependencies

| Пакет | Сейчас | Цель | Решение |
|---|---:|---:|---|
| [`@chakra-ui/react`](https://www.npmjs.com/package/@chakra-ui/react) | `^2.10.9` | `^3.36.1` | мигрировать |
| [`@emotion/react`](https://www.npmjs.com/package/@emotion/react) | `^11.14.0` | `^11.14.0` | оставить |
| [`next-themes`](https://www.npmjs.com/package/next-themes) | — | `^0.4.6` | добавить для color mode |
| [`@emotion/styled`](https://www.npmjs.com/package/@emotion/styled) | `^11.14.1` | — | удалить после проверки импортов |
| [`framer-motion`](https://www.npmjs.com/package/framer-motion) | `^11.18.2` | — | удалить: Chakra v3 больше не требует |
| [`i18next`](https://www.npmjs.com/package/i18next) | `^26.3.6` | `^26.4.0` | обновить |
| [`i18next-browser-languagedetector`](https://www.npmjs.com/package/i18next-browser-languagedetector) | `^8.2.1` | `^8.2.1` | оставить |
| [`react`](https://www.npmjs.com/package/react) | `^19.2.7` | `^19.2.8` | обновить |
| [`react-dom`](https://www.npmjs.com/package/react-dom) | `^19.2.7` | `^19.2.8` | обновить синхронно с React |
| [`react-i18next`](https://www.npmjs.com/package/react-i18next) | `^17.0.9` | `^17.0.12` | обновить |
| [`react-router-dom`](https://www.npmjs.com/package/react-router-dom) | `^7.18.1` | `^7.18.2` | обновить |
| [`react-swipeable`](https://www.npmjs.com/package/react-swipeable) | `^7.0.2` | `^7.0.2` | оставить |
| [`simplebar-react`](https://www.npmjs.com/package/simplebar-react) | `^3.3.2` | `^3.3.2` | оставить |
| [`zustand`](https://www.npmjs.com/package/zustand) | `^5.0.14` | `^5.0.15` | обновить |

Официальный Chakra guide прямо требует оставить `@chakra-ui/react` + `@emotion/react` и удалить больше не нужные `@emotion/styled` и `framer-motion`: [Update Packages](https://chakra-ui.com/docs/get-started/migration#update-packages).

### 4.2 Dev dependencies

| Пакет | Сейчас | Цель | Решение |
|---|---:|---:|---|
| [`@chakra-ui/cli`](https://www.npmjs.com/package/@chakra-ui/cli) | — | `^3.36.1` | добавить для snippets/typegen |
| [`@playwright/test`](https://www.npmjs.com/package/@playwright/test) | — | `^1.62.1` | добавить |
| [`@axe-core/playwright`](https://www.npmjs.com/package/@axe-core/playwright) | — | `^4.13.0` | добавить |
| [`@types/node`](https://www.npmjs.com/package/@types/node) | `^26.1.1` | `^26.3.0` | обновить |
| [`@types/react`](https://www.npmjs.com/package/@types/react) | `^19.2.17` | `^19.2.18` | обновить |
| [`@types/react-dom`](https://www.npmjs.com/package/@types/react-dom) | `^19.2.3` | `^19.2.5` | обновить |
| [`@types/react-helmet`](https://www.npmjs.com/package/@types/react-helmet) | `^6.1.11` | — | удалить: `react-helmet` не используется |
| [`@types/react-router-dom`](https://www.npmjs.com/package/@types/react-router-dom) | `^5.3.3` | — | удалить: React Router v7 содержит типы |
| [`@vitejs/plugin-react`](https://www.npmjs.com/package/@vitejs/plugin-react) | `^6.0.3` | — | удалить: проект использует SWC-plugin |
| [`@vitejs/plugin-react-swc`](https://www.npmjs.com/package/@vitejs/plugin-react-swc) | `^4.3.1` | `^4.3.3` | обновить |
| [`eslint`](https://www.npmjs.com/package/eslint) | `^10.7.0` | `^10.9.1` | обновить |
| [`lint-staged`](https://www.npmjs.com/package/lint-staged) | `^17.0.8` | — | удалить: конфигурации и рабочего hook нет |
| [`prettier`](https://www.npmjs.com/package/prettier) | `^3.9.5` | `^3.9.6` | обновить |
| [`typescript`](https://www.npmjs.com/package/typescript) | `5.5.4` | `^6.0.3` | совместимый stable, не latest `7.0.2` |
| [`typescript-eslint`](https://www.npmjs.com/package/typescript-eslint) | `^8.63.0` | `^8.68.0` | обновить |
| [`vite`](https://www.npmjs.com/package/vite) | `^8.1.4` | `^8.2.2` | обновить |
| [`vite-plugin-inspect`](https://www.npmjs.com/package/vite-plugin-inspect) | `^11.4.1` | `^12.0.2` | обновить major и проверить config |
| [`vite-plugin-pwa`](https://www.npmjs.com/package/vite-plugin-pwa) | `^1.3.0` | `^1.3.0` | оставить |
| [`vite-plugin-static-copy`](https://www.npmjs.com/package/vite-plugin-static-copy) | `^4.1.1` | — | удалить; статические файлы перенести в `public/` |

Исключение: latest `typescript@7.0.2` несовместим с peer range `typescript >=4.8.4 <6.1.0` у `typescript-eslint@8.68.0`; поэтому целевая версия — новейшая подходящая stable `6.0.3`. Использовать `--force` запрещено.

После изменения dependency graph пересоздать `bun.lock` обычным `bun install`. В `package.json` использовать `^`, точное разрешение оставить lockfile.

### 4.3 GitHub Actions

| Action | Сейчас | Цель |
|---|---:|---:|
| [`actions/checkout`](https://github.com/actions/checkout/releases) | `@v4` | `@v7` (stable `7.0.1`) |
| [`oven-sh/setup-bun`](https://github.com/oven-sh/setup-bun/releases) | `@v2` | оставить `@v2` (stable `2.2.0`) |
| [`peaceiris/actions-gh-pages`](https://github.com/peaceiris/actions-gh-pages/releases) | `@v4` | оставить `@v4` (stable `4.1.0`) |
| [`actions/upload-artifact`](https://github.com/actions/upload-artifact/releases) | — | добавить `@v7` для Playwright report |
| [`actions/download-artifact`](https://github.com/actions/download-artifact/releases) | — | добавить `@v8` для передачи проверенного `dist` в deploy job |

Workflow использует major tags, а не плавающие ветки. `bun-version: latest` остаётся по явному решению заказчика.

## 5. Prerequisites и совместимость

- Chakra v3 требует Node 20.x: [Chakra installation](https://chakra-ui.com/docs/get-started/installation).
- Vite 8.2.2 требует Node `^20.19.0 || >=22.12.0`; Playwright 1.62.1 — Node `>=20` (официальные npm metadata).
- Актуальный `@chakra-ui/codemod@3.36.1` требует Node `>=22`: [codemod package.json](https://github.com/chakra-ui/chakra-ui/blob/main/packages/codemod/package.json). Поэтому для шага codemod нужен Node 22+, хотя runtime Chakra допускает Node 20+.
- Peer dependencies `@chakra-ui/react@3.36.1`: `@emotion/react >=11`, `react >=18`, `react-dom >=18`; выбранные версии совместимы: [Chakra package.json](https://github.com/chakra-ui/chakra-ui/blob/main/packages/react/package.json).
- До изменений выполнить codemod только в preview-режиме: `npx @chakra-ui/codemod upgrade --dry`; результат не применять вслепую. Официальная команда: [Chakra migration codemod](https://chakra-ui.com/docs/get-started/migration#codemod-recommended).

## 6. Этапы реализации

### Декомпозиция

| Задача | Результат | Зависит от | Статус |
|---|---|---|---|
| 1. Baseline и test harness | Восстановлена текущая сборка; добавлены Playwright, axe, smoke-сценарии, screenshots и JS baseline | — | Завершена |
| 2. Остальные зависимости | Все пакеты, кроме Chakra-стека, обновлены до stable; лишние удалены | 1 | Завершена |
| 3. Chakra UI v3 | Атомарно мигрированы provider, theme, color mode и все components; UI 1:1 | 2 | Завершена |
| 4. CI/deploy и README | PR выполняет verify; push в `master` публикует только проверенный artifact; команды описаны | 3 | Завершена |
| 5. Итоговая приёмка | Cross-browser, PWA, security, persistence и JS budget пройдены; исправлены только миграционные дефекты | 4 | Завершена локально |

Каждая задача заканчивается рабочими typecheck, lint, build и всеми тестами, актуальными на её этапе. Chakra мигрируется атомарно в задаче 3: временные две версии Chakra или два Provider не вводятся.

### Результат задачи 1

- Текущий dependency graph восстановлен через `bun install` на Bun `1.4.0`; Chakra и остальные существующие зависимости не обновлялись.
- Добавлены только test-зависимости `@playwright/test@1.62.1` и `@axe-core/playwright@4.13.0`, scripts `typecheck`, `test:e2e`, `test:a11y`, а также пять согласованных Playwright projects.
- `bun run typecheck`, `bun run eslint .` и `bun run build` проходят. Production build: Vite `8.1.4`, 1135 modules.
- Playwright: 19 проверок прошли, 6 ожидаемо пропущены. Axe выполняется один раз в desktop Chromium; desktop-only language flow не дублируется в mobile layout.
- Зафиксированы screenshots: `tests/e2e/baseline/timer-{light,dark}-{320x642,1280x720}.png`.
- Исходный production JS baseline до исправлений задачи 1: `771864` bytes. После минимальных исправлений: `771972` bytes (`+108`, около `0.014%`). Для лимита миграции использовать исходные `771864` bytes; максимум `849050` bytes.
- Axe baseline для `serious`/`critical`: `button-name` — не более 4 nodes, `color-contrast` — не более 1, `link-name` — не более 1. Тест запрещает новые rule IDs и рост количества nodes.
- Найденные блокеры baseline исправлены без визуальных изменений: некорректный ESLint flat config, две lint-ошибки, отсутствующее доступное имя кнопки темы и падение WebKit при отсутствии `AudioContext`.
- Известный неблокирующий UI baseline: в dark mobile screenshot текст активной красной стадии визуально теряется на красном фоне. Исправление отложено до отдельного миграционного сравнения.
- До задачи 2 `bun audit --audit-level=high` фиксировал 16 существующих `high`: цепочки через Babel/Workbox, `brace-expansion`, `fast-uri`, `lodash`/`lodash-es`, `nanoid` и `react-router@7.18.1`. Они не были вызваны test harness и устранены в задаче 2.

### Результат задачи 2

- Chakra-стек оставлен без изменений до атомарной задачи 3: `@chakra-ui/react@2.10.9`, `@emotion/react@11.14.0`, `@emotion/styled@11.14.1`, `framer-motion@11.18.2`.
- Обновлены production-зависимости: `i18next@26.4.0`, React/React DOM `19.2.8`, `react-i18next@17.0.12`, React Router DOM `7.18.2`, Zustand `5.0.15`.
- Обновлены dev-зависимости: Node/React types, React SWC plugin, ESLint, Prettier, TypeScript `6.0.3`, typescript-eslint, Vite `8.2.2`, vite-plugin-inspect `12.0.2`.
- TypeScript `7.0.2` не установлен: он выходит за peer range `<6.1.0` у `typescript-eslint@8.68.0`. Все обновлённые прямые версии записаны caret-ranges.
- Удалены подтверждённо неиспользуемые `@types/react-helmet`, `@types/react-router-dom`, `@vitejs/plugin-react`, `lint-staged`.
- Для Vite 8 config loader локальный импорт `meta` получил явное расширение `.ts`; runtime/PWA config не изменён.
- `bun audit fix` без `--latest` обновил только уязвимые транзитивные версии внутри разрешённых ranges. Итог: `No vulnerabilities found`, проверено 618 packages.
- `bun run typecheck`, `bun run eslint .`, Prettier check и `bun run build` проходят; Playwright: 19 passed, 6 ожидаемо skipped.
- Production JS после задачи 2: `768802` bytes, что на `3062` bytes (`0.40%`) меньше исходного baseline `771864`.

### Результат задачи 3

- Chakra-стек атомарно обновлён до `@chakra-ui/react@3.36.1`; добавлены `next-themes@0.4.6` и `@chakra-ui/cli@3.36.1`, удалены `@emotion/styled` и `framer-motion`.
- Provider, color mode, theme tokens, semantic tokens, recipes и slot recipes перенесены на Chakra v3. Старый ключ темы `chakra-ui-color-mode` и атрибут `data-theme` сохранены.
- На compound API v3 перенесены Drawer, Dialog, Menu, Tabs, Slider, Switch, Field, Tooltip и Toast. Custom SVG исправлены под новый `Icon asChild` contract.
- `chakra typegen`, typecheck, ESLint, production build и `bun audit --audit-level=high` проходят. Audit: `No vulnerabilities found`, проверено 742 packages.
- Playwright: 19 проверок прошли, 6 ожидаемо пропущены. В свежей production-сессии вручную проверены desktop/mobile light/dark, stage dialog, mobile/language drawers, settings tabs, sliders, menus и switch.
- Production JS: `848082` bytes в `dist/assets/**/*.js`; лимит `849050` соблюдён, запас `968` bytes.

### Результат задачи 4

- Workflow разделён на `verify` и `deploy`: pull request выполняет только проверки, а push в `master` публикует уже проверенный `dist` без повторной сборки.
- В `verify` добавлены typegen, typecheck, ESLint, production build, JS budget, audit и Playwright; отчёт Playwright и проверенный `dist` передаются через artifacts.
- Actions обновлены до major tags `actions/checkout@v7`, `actions/upload-artifact@v7`, `actions/download-artifact@v8`; `oven-sh/setup-bun@v2` и `peaceiris/actions-gh-pages@v4` сохранены.
- Добавлены отдельные scripts для production build, JS budget, audit и обновления Playwright screenshots; команды разработки, проверок и CI описаны в README.
- `vite-plugin-static-copy` удалён. `.htaccess`, `robots.txt` и `sitemap.xml` перенесены в `public/` и попадают в корень `dist` штатным механизмом Vite.
- Production JS: `848957` bytes при лимите `849050`, запас `93` bytes.
- Локальный Playwright: `69 passed`, `6 skipped`, падений нет. Audit: `No vulnerabilities found`, проверено 736 пакетов.

### Результат задачи 5

- Исправлено мобильное переполнение settings на `320×642`: внутренний overflow стал `0px`, Reset и Copy остаются на одной центральной линии и полностью видимы.
- Кнопка настроек больше не подменяет семантическую роль `<button>` на `group`; hover/focus-анимация и внешний вид сохранены. Кнопка Copy получила доступное имя.
- Проверены production preview, RU/EN/DE, light/dark, сохранение `settings-storage` и `session-storage`, autostart, PWA manifest/service worker и offline app shell.
- Проверка slider сделана атомарной в одном DOM-снимке; после исправления полный прогон стабилен: `74 passed`, `6 skipped` во всех пяти Playwright projects. Axe не добавил serious/critical нарушений.
- `bun run audit`: `No vulnerabilities found`, проверено 736 пакетов. JS budget: `848994 / 849050` bytes; запас `56` bytes.
- `git diff --check` проходит. Коммит, push и deploy не выполнялись.
- Ограничение приёмки: headless/Playwright WebKit не подтверждает физический звук, системные notifications и реальный Safari/iOS; эти проверки остаются ручными.

### Этап 0. Baseline до обновления

1. Убедиться, что worktree не содержит несогласованных изменений, кроме этого ТЗ.
2. Выполнить чистую установку текущего dependency graph и зафиксировать фактические версии. Не использовать случайное старое содержимое `node_modules` как baseline.
3. Зафиксировать результаты typecheck/lint/build и все уже существующие ошибки отдельно.
4. Снять эталонные screenshots светлой и тёмной темы на `320×642` и `1280×720` в одном и том же окружении.
5. Зафиксировать сумму байтов production-файлов `dist/assets/**/*.js` без gzip. Итог после миграции не должен превышать baseline более чем на 10%.
6. Вручную пройти таймер, настройки, тему, языки, drawers/menu/dialog, звук, уведомления, PWA install/update/offline.

Playwright предупреждает, что screenshot rendering зависит от ОС, браузера и окружения; baseline и сравнение должны создаваться в одинаковой среде: [Visual comparisons](https://playwright.dev/docs/test-snapshots).

### Этап 1. Обновление dependency graph

1. Применить таблицы из раздела 4.
2. Удалять зависимости только после повторного поиска импортов/config usage.
3. Выполнить обычный `bun install`, обновить `bun.lock`.
4. Проверить peer dependency warnings; не подавлять их флагами force/legacy.
5. Выполнить `bun audit --audit-level=high`; high/critical блокируют завершение. Официальное поведение команды: [Bun audit](https://bun.sh/docs/pm/cli/audit).

### Этап 2. Provider, color mode и theme system

1. `extendTheme` заменить на `defineConfig` + `createSystem(defaultConfig, config)`.
2. Все token values обернуть в `{ value: ... }`; перенести colors, spacing, sizes, fonts, font weights, breakpoints, text styles, semantic tokens и global styles.
3. Для semantic tokens перенести light/dark значения в v3 conditions без изменения фактических цветов.
4. `defineStyleConfig`/`useStyleConfig` заменить recipes/slot recipes либо закрытыми компонентами с тем же публичным API. Это относится к Button, Container, Drawer, Tooltip, Switch, Tabs, Input, Link, Menu и `ActionButtonStyles`.
5. После переноса custom tokens/recipes запускать `chakra typegen` до typecheck/build. Официальная CI-рекомендация: [Chakra CLI typegen](https://chakra-ui.com/docs/get-started/cli#workflow-integration).
6. `ChakraProvider theme={theme}` заменить на `ChakraProvider value={system}` через локальный Provider composition.
7. Удалить `ColorModeScript`; color mode перевести на официальный snippet/`next-themes`: [Color mode](https://chakra-ui.com/docs/components/concepts/color-mode).
8. Сохранить `defaultTheme="system"`, `enableSystem`, class-based light/dark conditions и отсутствие flash до первого React render.
9. Установить `storageKey="chakra-ui-color-mode"`, чтобы существующий выбор темы не потерялся. Новый default key `theme` не использовать.

### Этап 3. Миграция применимых Chakra v2 API

| Найдено в проекте | Требуемая миграция |
|---|---|
| `Modal*` в `StageModal` | `Dialog.Root/Backdrop/Positioner/Content/Header/Body`; `isOpen → open`, `onClose → onOpenChange` |
| `Drawer*` в `LangMenu`/`MobileMenu` | compound `Drawer.*` + `Portal` + `Positioner`; `placement="right" → "end"`; сохранить swipe и размеры |
| `Menu*`, `MenuOptionGroup`, `MenuItemOption` | `Menu.Root/Trigger/Positioner/Content/RadioItemGroup/RadioItem`; каждому item задать стабильный `value`; controlled open callbacks перевести на `onOpenChange` |
| `Tabs`, `Tab*` | `Tabs.Root/List/Trigger/Indicator/Content`; стабильные string `value`; сохранить две вкладки и indicator |
| `Slider*` | `Slider.Root/Control/Track/Range/Thumb/HiddenInput`; value как массив; `onChange → onValueChange({ value })` |
| `Switch` | `Switch.Root/HiddenInput/Control/Thumb`; `isChecked → checked`, `isDisabled → disabled`, `onChange → onCheckedChange` |
| `FormControl`, `FormLabel` | `Field.Root`, `Field.Label`; сохранить связь label/control и доступные имена |
| `Tooltip` | официальный closed snippet; `label → content`, `hasArrow → showArrow`, positioning object; удалить неподдерживаемые `arrowSize/arrowPadding` с визуальной компенсацией стилями |
| `useToast`, `UseToastOptions` | один `<Toaster />`, singleton `toaster`, `create/update/dismiss`; сохранить кастомный render, позицию, статусы, close и IDs |
| `Fade` | `Presence` с эквивалентной CSS-анимацией и `prefers-reduced-motion` |
| `useColorMode`, `ColorMode`, `ColorModeScript` | локальный color-mode snippet/types поверх `next-themes`; script удалить |
| `useDisclosure` | остаётся доступен; адаптировать имена state к `open` на границах compound components |
| `useToken` | оставить, подтвердить типы и фактические CSS/token values после typegen |
| `useStyleConfig`, `defineStyleConfig` | recipes/slot recipes; v2 API не оставлять |
| `sx`, `__css`, nested selectors | `css`; вложенные selectors обязательно с `&` |
| `spacing` у Stack/HStack/VStack | `gap` |
| `isDisabled`, `isActive` | `disabled`; активное состояние — `data-active`/recipe state |
| `DrawerProps`, `ModalProps`, `MenuProps`, `TooltipProps`, `UseToastOptions`, `ChakraTheme` | заменить актуальными v3 types или узкими локальными props; не экспортировать широкие library props без необходимости |
| custom `createIcon`/`Icon` | сохранить форму SVG; проверить v3 size API и применение style props; для raw SVG использовать `asChild` |

Официальные детали: [Dialog](https://chakra-ui.com/docs/components/dialog), [Drawer](https://chakra-ui.com/docs/components/drawer), [Menu](https://chakra-ui.com/docs/components/menu), [Tabs](https://chakra-ui.com/docs/components/tabs), [Slider](https://chakra-ui.com/docs/components/slider), [Switch](https://chakra-ui.com/docs/components/switch), [Field](https://chakra-ui.com/docs/components/field), [Tooltip](https://chakra-ui.com/docs/components/tooltip), [Toast](https://chakra-ui.com/docs/components/toast) и полный [migration guide](https://chakra-ui.com/docs/get-started/migration).

### Этап 4. Сохранение данных и поведения

- Не менять ключи и JSON shape `settings-storage` и `session-storage`. Если shape всё же потребуется изменить, добавить versioned Zustand migration и тест старого payload.
- Сохранить ключ языка `i18nextLng`, cookie/localStorage cache, URL query detection и RU/EN/DE: [official detector options](https://github.com/i18next/i18next-browser-languageDetector/blob/master/README.md#detector-options).
- Сохранить `chakra-ui-color-mode`, значения `light`/`dark`/`system` и системную тему.
- Не менять длительности, стадии, автозапуск, громкость, выбранные аудиофайлы, разрешение уведомлений и ссылки настроек.
- Не менять `base: '/pomodoro/'`, route contract `/` и `/settings`, manifest `id/start_url/scope`, caching rules или структуру published `dist`, кроме изменений, необходимых новой версии plugin. `BrowserRouter` должен корректно работать под GitHub Pages subpath; любое изменение basename допустимо только если baseline подтвердит блокирующую проблему.

### Этап 5. Playwright и accessibility

Добавить `playwright.config.ts` и минимальный набор smoke-тестов. Production/PWA-сценарии запускать против `bun run build` + `bun run preview`, а не только dev server.

Проекты Playwright:

- desktop Chromium;
- desktop Firefox;
- desktop WebKit;
- Mobile Chrome device profile;
- Mobile Safari device profile.

Это официальный подход через Playwright projects/devices: [Browsers and devices](https://playwright.dev/docs/browsers#configure-browsers).

Обязательные сценарии:

1. Главный экран загружается без page errors и failed first-party requests.
2. Старт/пауза/пропуск/сброс таймера и смена стадии.
3. Открытие/закрытие stage dialog, language drawer, mobile drawer и sound menus мышью, touch и клавиатурой; Escape, focus trap и возврат focus.
4. Настройки изменяются, reset работает; после reload сохраняются `settings-storage` и `session-storage` в прежнем shape.
5. Light/dark/system переключаются и сохраняются под старым ключом без flash.
6. RU/EN/DE переключаются и сохраняются в `i18nextLng`.
7. Slider, switch, numeric input и tabs управляются клавиатурой и имеют доступные имена.
8. Toast создаётся, обновляется и закрывается.
9. Запрос notification permission и отправка notification при завершении таймера проверяются контролируемым browser stub/permission context; реальное системное отображение дополнительно проверяется вручную.
10. Tick/alarm source загружается, play/stop вызываются с выбранной громкостью; слышимость дополнительно проверяется вручную.
11. PWA: manifest и service worker доступны под `/pomodoro/`, обновление SW не ломает приложение, после первичной загрузки ранее открытый app shell запускается offline.
12. Screenshot comparison light/dark на `320×642` и `1280×720`; заметные отличия запрещены, допускается только несущественный platform-specific font antialiasing.

Accessibility:

- На главном экране, settings и открытых overlays запускать `AxeBuilder` после перехода UI в нужное состояние.
- CI блокируют новые нарушения с impact `serious` и `critical`.
- Отдельно вручную проверить keyboard flow/focus, потому что автоматический axe не находит все WCAG-проблемы. Официальный пример и ограничение: [Playwright accessibility testing](https://playwright.dev/docs/accessibility-testing).

### Этап 6. CI и deploy

Один workflow должен запускаться на `pull_request` в `master` и `push` в `master`.

`verify` job для обоих событий:

1. `actions/checkout@v7`.
2. `oven-sh/setup-bun@v2` с `bun-version: latest`.
3. `bun install`.
4. Chakra typegen.
5. typecheck.
6. ESLint.
7. build.
8. проверка JS budget `<= baseline × 1.10`.
9. `bun audit --audit-level=high`.
10. `bunx playwright install --with-deps`.
11. Playwright для всех пяти projects, включая axe.
12. При любом результате, кроме cancellation, загрузить `playwright-report` через `actions/upload-artifact@v7`.
13. Только при успехе всех проверок загрузить `dist` как отдельный artifact через `actions/upload-artifact@v7`.

`deploy` job:

- `needs: verify`;
- условие: только `github.event_name == 'push'` и `refs/heads/master`;
- только здесь дать `contents: write`;
- выполнить checkout, скачать именно artifact `dist` из `verify` через `actions/download-artifact@v8`;
- публиковать этот уже проверенный `./dist` в `gh-pages` через `peaceiris/actions-gh-pages@v4`, не пересобирая его;
- при падении любой проверки deploy не выполняется.

Официальная схема Playwright CI и рекомендация `workers: 1` в CI: [Playwright CI](https://playwright.dev/docs/ci). Права checkout по умолчанию оставить read-only, write выдать только deploy job: [actions/checkout permissions](https://github.com/actions/checkout#recommended-permissions).

## 7. Команды проекта после реализации

Добавить/нормализовать scripts:

- `typecheck` — `tsc --noEmit`;
- `typegen` — Chakra CLI type generation;
- `lint` — ESLint без auto-fix;
- `build` — typegen/typecheck и Vite production build без дублирования тяжёлых шагов в CI;
- `test:e2e` — Playwright;
- `test:e2e:update` — осознанное обновление screenshots;
- `test:a11y` — соответствующий Playwright subset либо общий e2e run;
- `audit` — `bun audit --audit-level=high`.

README обновить только командами разработки/проверки, установкой браузеров Playwright и описанием CI. Массово документацию не переписывать.

## 8. Критерии приёмки

- В `package.json` нет Chakra v2-only/неиспользуемых зависимостей и все версии соответствуют согласованной stable-матрице либо имеют документированное peer-compatible исключение.
- `bun.lock` соответствует `package.json`; установка обычным `bun install` проходит без peer errors.
- В `src` нет `extendTheme`, `defineStyleConfig`, `useStyleConfig`, `ColorModeScript`, Chakra-v2 `Modal*`, legacy `Drawer*`, legacy `Menu*`, legacy `Tabs/Slider/Switch/FormControl`, `sx` и `__css`.
- Typegen, typecheck, lint, build, audit и Playwright проходят.
- Нет новых `serious`/`critical` axe violations.
- UI light/dark визуально совпадает с baseline на `320×642` и `1280×720`.
- Production JS вырос не более чем на 10%.
- Сохранились theme, RU/EN/DE, `settings-storage`, `session-storage`, timer state, audio, notifications и все основные overlays.
- PWA устанавливается, корректно обновляет cache/service worker и запускает ранее открытый app shell offline.
- PR выполняет только проверки; push в `master` выполняет проверки и только затем deploy в `gh-pages`.
- В diff нет массового форматирования, несвязанных исправлений, коммитов или deployment вне согласованного workflow.

## 9. Ограничения исследования

- ТЗ не меняет `package.json`, `bun.lock`, исходники или workflow; числовой baseline JS и screenshots должны быть сняты до первого implementation change.
- Версии подтверждены на 2026-08-26, но могут измениться до начала реализации; повторная registry-проверка обязательна.
- Playwright WebKit на Linux полезен для совместимости, но не равен реальному Safari/iOS; финальная ручная проверка Safari/iOS остаётся обязательной.
- Headless CI не подтверждает, что пользователь физически слышит звук или видит системное уведомление; CI проверяет интеграционные вызовы, а реальное поведение — ручная приёмка.
- Обычный `bun install` с плавающим `bun-version: latest` менее воспроизводим, чем `bun ci`; это осознанное решение заказчика. Официальное различие описано в [Bun install CI docs](https://github.com/oven-sh/bun/blob/main/docs/pm/cli/install.mdx#cicd).
