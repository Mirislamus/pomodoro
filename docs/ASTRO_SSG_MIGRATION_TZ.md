# ТЗ: миграция проекта Pomotomo Focus Timer с Vite SPA на Astro SSG

- **Статус**: все задачи (1–8) успешно завершены и полностью верифицированы.
- **Дата составления**: 2026-09-16.
- **Рабочая ветка**: `dev` (с последующим PR в `master`).

---

## 1. Цель проекта

Перевести веб-приложение **Pomotomo Focus Timer** с архитектуры Single Page Application (Vite + React Router) на архитектуру **Static Site Generation (SSG)** с помощью фреймворка **Astro** (актуальная стабильная версия **7.3.2** на сентябрь 2026 года).

### Главные критерии успеха:
1. **100% визуальная и поведенческая идентичность (1 в 1)**:
   - Полное сохранение внешнего вида, адаптивности (mobile/tablet/desktop), тем (Light/Dark/System), шрифтов, отступов и цветов Chakra UI v3.
   - Успешное прохождение скриншотных тестов регрессии Playwright (`tests/e2e/baseline/*.png`).
2. **Бесшовный пользовательский опыт**:
   - Работа таймера, воспроизведение тиканья/звуков будильника и системные уведомления не должны прерываться при переходе между страницами (Таймер ↔ Настройки).
   - Навигация без полной перезагрузки окна браузера благодаря **Astro ClientRouter (View Transitions)** и персистентному острову (`transition:persist`).
3. **Продвинутое SSG и SEO**:
   - Предгенерация чистого статического HTML для каждого маршрута.
   - Мультиязычный SSG-роутинг: основной язык (EN) на корне `/pomodoro/`, локализованные версии на `/pomodoro/ru/` и `/pomodoro/de/`.
   - Полная генерация мета-тегов (`title`, `description`, OpenGraph, Twitter Cards, `hreflang`, canonical) и автоматическая генерация актуального `sitemap.xml`.
4. **Сохранение PWA**:
   - Поддержка офлайн-режима, Web App Manifest и Service Worker через `@vite-pwa/astro`.

---

## 2. Обязательные ограничения и требования

- **Стек компонентов**: React 19 и `@chakra-ui/react` v3 остаются основой интерактивного UI.
- **Никаких визуальных изменений или редизайна**: текущие стили, recipes и semantic tokens Chakra v3 переносятся 1 в 1.
- **Роутер**: полное удаление библиотеки `react-router-dom`; переход на навигацию через Astro ClientRouter.
- **Темизация без мерцания (No FOUC)**: переключение между светлой и тёмной темой хранится в `localStorage` (`chakra-ui-color-mode`) и инициализируется блокирующим inline-скриптом в `<head>` до отрисовки страницы.
- **Менеджер пакетов и CI/CD**: сохранение **Bun** (`oven-sh/setup-bun@v2`, `bun install`, `bun-version: latest`) и автоматический деплой проверенного билда в GitHub Pages (`peaceiris/actions-gh-pages@v4`).
- **JS-бюджет**: скрипт `scripts/check-js-budget.mjs` и команда `bun run check:js-budget` удаляются из проекта и CI (по прямому согласованию с заказчиком).
- **Контроль качества**: в пайплайн добавляется `@astrojs/check` для валидации шаблонов `.astro` и TypeScript; все E2E и a11y тесты Playwright должны успешно выполняться.

---

## 3. Анализ текущего состояния и целевая архитектура

### 3.1. Текущее состояние (Vite SPA)
- **Точка входа**: `index.html` → `src/index.tsx` (монтирование React-приложения в `#root`).
- **Провайдеры**: `Provider` (`ChakraProvider` с темой `system` + `ColorModeProvider` на базе `next-themes`), `BrowserRouter` (с `basename="pomodoro"`), `Toaster`.
- **Маршрутизация**: `react-router-dom` с двумя маршрутами: `/` (`Timer.tsx`) и `/settings` (`Settings.tsx`).
- **Стейт-менеджмент**: Zustand с `persist`-мидлваром под ключами:
  - `settings-storage` (настройки таймера, звуков, уведомлений);
  - `session-storage` (текущая сессия, стадия, таймстемпы, счетчик циклов).
- **Интернационализация**: `i18next` + `react-i18next` + `i18next-browser-languagedetector` (ключ `i18nextLng`).
- **Стили**: Chakra UI v3 (`@chakra-ui/react`, `@emotion/react`, `@chakra-ui/cli` typegen), локальные шрифты `src/theme/typography/fonts.css`.
- **PWA**: `vite-plugin-pwa` с `registerType: 'autoUpdate'`.

### 3.2. Целевая архитектура (Astro SSG + Islands)

```
                       ┌──────────────────────────────────────────────┐
                       │             Astro 7 SSG Engine               │
                       │ (Build Time: генерация статического HTML)    │
                       └──────────────────────┬───────────────────────┘
                                              │
                    ┌─────────────────────────┴────────────────────────┐
                    ▼                                                  ▼
      ┌───────────────────────────┐                      ┌───────────────────────────┐
      │   src/layouts/BaseLayout  │                      │   Astro Pages (Routing)   │
      │   - SEO & Meta (OpenGraph)│                      │ - / (EN)                  │
      │   - Alternate hreflang    │                      │ - /settings (EN)          │
      │   - No-FOUC Theme Script  │                      │ - /ru/ & /ru/settings     │
      │   - Astro <ClientRouter />│                      │ - /de/ & /de/settings     │
      └─────────────┬─────────────┘                      └─────────────┬─────────────┘
                    │                                                  │
                    └─────────────────────────┬────────────────────────┘
                                              │
                                              ▼
                    ┌──────────────────────────────────────────────────┐
                    │      Persistent React Island (transition:persist)│
                    │                  src/app/AppShell                │
                    │ ┌──────────────────────────────────────────────┐ │
                    │ │ Provider (ChakraProvider + ColorModeProvider)│ │
                    │ │ ┌──────────────────────────────────────────┐ │ │
                    │ │ │  Layout (Header, Drawer, Modal, Footer)  │ │ │
                    │ │ │  ┌─────────────────────────────────────┐ │ │ │
                    │ │ │  │   Active View (Slot / Children)     │ │ │ │
                    │ │ │  │   TimerView.tsx / SettingsView.tsx  │ │ │ │
                    │ │ │  └─────────────────────────────────────┘ │ │ │
                    │ │ └──────────────────────────────────────────┘ │ │
                    │ └──────────────────────────────────────────────┘ │
                    └──────────────────────────────────────────────────┘
```

1. **Astro Base Layout (`src/layouts/BaseLayout.astro`)**:
   - Формирует разметку `<!doctype html>` с атрибутом `lang`.
   - Включает `<ClientRouter />` для бесшовной клиентской навигации между страницами без сброса JS-контекста.
   - Содержит `<script is:inline>` в `<head>`, читающий тему из `localStorage` (`chakra-ui-color-mode`) и выставляющий класс и `data-theme` на тег `<html>` до первого рендеринга.
   - Генерирует SEO-теги, OpenGraph, Twitter Cards, фавиконы и ссылки `rel="alternate" hreflang="..."`.
2. **Persistent App Shell (`src/app/AppShell.tsx`)**:
   - Единый React-остров (`client:load` + `transition:persist="pomotomo-app"`).
   - Оборачивает интерфейс в `Provider` (`ChakraProvider` + `ColorModeProvider`) и `Toaster`.
   - Рендерит общий каркас: `Header`, `Footer`, `MobileMenu`, `LangMenu`.
   - Поскольку остров помечен атрибутом `transition:persist`, при переходах по ссылкам React-дерево и Zustand-хранилища не перемонтируются заново, таймер и воспроизведение аудио продолжают работать без остановок.
3. **React Views (`src/views/`)**:
   - `TimerView.tsx`: представление таймера (бывший `Timer.tsx`).
   - `SettingsView.tsx`: представление настроек (бывший `Settings.tsx`).
4. **Синхронизация локализации**:
   - URL является главным источником правды для поисковых систем и первичной загрузки.
   - `LangMenu` при выборе языка вызывает `navigate()` из `astro:transitions/client` на соответствующий маршрут (`/` ↔ `/ru/` ↔ `/de/`) и обновляет `localStorage` (`i18nextLng`).
   - При гидратации React-остров инициализирует инстанс `i18next` с локалью, переданной из параметров Astro-страницы.

---

## 4. Изменения в структуре каталогов

```diff
  pomodoro/
-   index.html
-   vite.config.ts
+   astro.config.ts
    package.json
    playwright.config.ts
    public/
      images/
      sounds/
      robots.txt
-     sitemap.xml                     # удаляется ручной файл в пользу @astrojs/sitemap
    src/
+     layouts/
+       BaseLayout.astro              # базовый HTML каркас, SEO, Head, ClientRouter, No-FOUC script
+     pages/
+       index.astro                   # EN /
+       settings.astro                # EN /settings
+       [lang]/
+         index.astro                 # RU/DE /ru, /de
+         settings.astro              # RU/DE /ru/settings, /de/settings
+     app/
+       AppShell.tsx                  # Persistent React Island (ChakraProvider, Layout, Dialogs)
-       App.tsx                       # удален react-router-dom код
+     views/
+       TimerView.tsx                 # бывший src/pages/Timer.tsx
+       SettingsView.tsx              # бывший src/pages/Settings.tsx
      components/                     # без изменений (1 в 1)
      consts/                         # без изменений
      data/
        meta.ts                       # мета-информация сайта
+       locales.ts                    # конфигурация поддерживаемых языков и SEO текстов
      hooks/                          # адаптированы хуки навигации
      localization/                   # словари en, ru, de и инициализатор i18n
      shared/                         # Layout, UI компоненты (1 в 1)
      stores/                         # Zustand stores (useSettingsStore, useSessionStore)
      theme/                          # Chakra v3 тема, шрифты, рецепты, токены (1 в 1)
      typings/                        # TypeScript декларации
      utils/                          # утилиты
    tests/
      e2e/
        smoke.spec.ts                 # обновлены URL и селекторы с учетом Astro
        a11y.spec.ts                  # accessibility проверки
        baseline/                     # скриншоты для сверки UI 1 в 1
```

---

## 5. Зависимости проекта

### 5.1. Добавляемые зависимости
| Пакет | Назначение |
|---|---|
| `astro` (`^7.3.2`) | Основной SSG-фреймворк (актуальная стабильная версия 7.x на сентябрь 2026) |
| `@astrojs/react` (`^6.0.5`) | Официальная интеграция для рендеринга и гидратации React 19 компонентов |
| `@astrojs/check` (`^0.9.10`) | Инструмент проверки типов и синтаксиса в `.astro` файлах |
| `@astrojs/sitemap` (`^3.7.4`) | Автоматическая генерация `sitemap-index.xml` и мультиязычных ссылок |
| `@vite-pwa/astro` (`^1.2.0`) | Официальная интеграция PWA (Workbox + Manifest + Service Worker) для Astro |

### 5.2. Удаляемые зависимости
| Пакет | Причина удаления |
|---|---|
| `react-router-dom` | Заменяется на нативный роутинг Astro + ClientRouter |
| `@vitejs/plugin-react-swc` | Сборкой React теперь управляет `@astrojs/react` |
| `vite-plugin-pwa` | Заменяется на `@vite-pwa/astro` |
| `vite-plugin-inspect` | Не требуется в Astro |
| `vite` (прямой devDep) | Поставляется и управляется внутри самого Astro |

### 5.3. Сохраняемые зависимости (без изменений)
- `@chakra-ui/react`, `@chakra-ui/cli`, `@emotion/react`, `next-themes`
- `react`, `react-dom`, `@types/react`, `@types/react-dom`
- `zustand`, `i18next`, `react-i18next`, `i18next-browser-languagedetector`
- `react-swipeable`, `simplebar-react`
- `@playwright/test`, `@axe-core/playwright`
- `eslint`, `prettier`, `typescript`, `typescript-eslint`

---

## 6. Декомпозиция задач миграции

Ниже представлен детальный план разбиения на 8 атомарных последовательных задач. Каждая задача имеет четкие входные данные, шаги реализации, ожидаемый результат и критерии валидации.

```
  ┌────────────────────────────────────────────────────────┐
  │ Задача 1. Аудит зависимостей и установка Astro-пакетов │
  └───────────────────────────┬────────────────────────────┘
                              │
  ┌───────────────────────────▼────────────────────────────┐
  │ Задача 2. Настройка astro.config.ts и PWA              │
  └───────────────────────────┬────────────────────────────┘
                              │
  ┌───────────────────────────▼────────────────────────────┐
  │ Задача 3. BaseLayout, No-FOUC скрипт темы и стили      │
  └───────────────────────────┬────────────────────────────┘
                              │
  ┌───────────────────────────▼────────────────────────────┐
  │ Задача 4. Перенос экранов в src/views/ и AppShell      │
  └───────────────────────────┬────────────────────────────┘
                              │
  ┌───────────────────────────▼────────────────────────────┐
  │ Задача 5. Реализация страниц SSG и мультиязычности     │
  └───────────────────────────┬────────────────────────────┘
                              │
  ┌───────────────────────────▼────────────────────────────┐
  │ Задача 6. Интеграция @astrojs/sitemap и PWA Service W. │
  └───────────────────────────┬────────────────────────────┘
                              │
  ┌───────────────────────────▼────────────────────────────┐
  │ Задача 7. Обновление Playwright, scripts и CI/CD       │
  └───────────────────────────┬────────────────────────────┘
                              │
  ┌───────────────────────────▼────────────────────────────┐
  │ Задача 8. Скриншотное регрессионное тестирование и UI  │
  └────────────────────────────────────────────────────────┘
```

---

### Задача 1: Аудит зависимостей и установка Astro-стека

- **Цель**: подготовить `package.json` и lockfile к переходу на Astro, удалить устаревшие Vite-специфичные пакеты и установить совместимые stable-версии инструментов Astro.
- **Шаги реализации**:
  1. Выполнить установку `astro`, `@astrojs/react`, `@astrojs/check`, `@astrojs/sitemap`, `@vite-pwa/astro`.
  2. Удалить `react-router-dom`, `@vitejs/plugin-react-swc`, `vite-plugin-pwa`, `vite-plugin-inspect`.
  3. Удалить файл `scripts/check-js-budget.mjs` и очистить команду `check:js-budget` в `package.json`.
  4. Обновить скрипты в `package.json`:
     ```json
     {
       "dev": "astro dev",
       "start": "astro dev",
       "build": "bun run typegen && bun run typecheck && astro build",
       "preview": "astro preview",
       "typecheck": "astro check && tsc --noEmit"
     }
     ```
  5. Перегенерировать `bun.lock` с помощью `bun install`.
- **Критерии приёмки**:
  - `bun install` отрабатывает чисто без ошибок и предупреждений об отсутствующих peer-dependencies.
  - В проекте установлены последние stable версии `@astrojs/react` и `astro`.

---

### Задача 2: Конфигурация `astro.config.ts`

- **Цель**: создать конфигурационный файл Astro с корректными параметрами сайта, базового пути GitHub Pages, интеграциями React, PWA, Sitemap и i18n.
- **Шаги реализации**:
  1. Создать `astro.config.ts`:
     ```ts
     import { defineConfig } from 'astro/config';
     import react from '@astrojs/react';
     import sitemap from '@astrojs/sitemap';
     import AstroPWA from '@vite-pwa/astro';
     import meta from './src/data/meta.ts';

     export default defineConfig({
       site: 'https://mirislamus.github.io',
       base: '/pomodoro',
       trailingSlash: 'ignore',
       integrations: [
         react(),
         sitemap({
           i18n: {
             defaultLocale: 'en',
             locales: {
               en: 'en-US',
               ru: 'ru-RU',
               de: 'de-DE',
             },
           },
         }),
         AstroPWA({
           registerType: 'autoUpdate',
           manifest: {
             name: meta.title,
             short_name: meta.short_name,
             description: meta.description,
             theme_color: meta.color,
             background_color: meta.color,
             id: '/pomodoro/',
             start_url: '/pomodoro/',
             scope: '/pomodoro/',
             display: 'fullscreen',
             display_override: ['fullscreen', 'standalone', 'minimal-ui', 'browser'],
             categories: ['education', 'productivity'],
             orientation: 'portrait',
             icons: [
               {
                 src: 'images/icons/icon-192x192.png',
                 sizes: '192x192',
                 type: 'image/png',
               },
               {
                 src: 'images/icons/icon-512x512.png',
                 sizes: '512x512',
                 type: 'image/png',
               },
             ],
           },
           workbox: {
             runtimeCaching: [
               {
                 urlPattern: ({ url }) => url.pathname.startsWith('/pomodoro/images/'),
                 handler: 'CacheFirst',
                 options: {
                   cacheName: 'image-cache',
                   expiration: {
                     maxEntries: 50,
                     maxAgeSeconds: 30 * 24 * 60 * 60,
                   },
                 },
               },
             ],
           },
         }),
       ],
       server: {
         port: 3000,
       },
     });
     ```
  2. Удалить старый `vite.config.ts`.
  3. Настроить `tsconfig.json` для поддержки JSX и Astro types (`astro/tsconfigs/strict` или расширение существующего конфига с `jsx: "react-jsx"`).
- **Критерии приёмки**:
  - Astro корректно считывает конфигурацию при вызове `astro --version` / `bun run dev`.

---

### Задача 3: `BaseLayout.astro`, No-FOUC инициализация темы и стили

- **Цель**: сформировать единый базовый макет Astro, гарантирующий корректную инициализацию Chakra UI, поддержку шрифтов и полное отсутствие визуального мерцания темы.
- **Шаги реализации**:
  1. Создать `src/layouts/BaseLayout.astro`:
     - Импорт шрифтов `../theme/typography/fonts.css`.
     - Импорт `<ClientRouter />` из `astro:transitions`.
     - Включение inline скрипта перед закрывающим тегом `</head>`:
       ```html
       <script is:inline>
         (function () {
           try {
             var storageKey = 'chakra-ui-color-mode';
             var savedTheme = localStorage.getItem(storageKey);
             var systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
             var theme = savedTheme === 'system' || !savedTheme ? (systemDark ? 'dark' : 'light') : savedTheme;
             var root = document.documentElement;
             root.classList.remove('light', 'dark');
             root.classList.add(theme);
             root.setAttribute('data-theme', theme);
             root.style.colorScheme = theme;
           } catch (e) {}
         })();
       </script>
       ```
     - Подключение метаданных: OpenGraph, Twitter Cards, canonical URL, alternate hreflang.
     - Тег `<slot />` для монтирования содержимого страницы.
  2. Удалить устаревший `index.html` из корня проекта.
- **Критерии приёмки**:
  - При перезагрузке страницы в темной теме отсутствует белый флеш (FOUC) до загрузки JavaScript.

---

### Задача 4: Перенос экранов в `src/views/` и создание `AppShell`

- **Цель**: отделить React-представления от Astro-роутинга, удалить вызовы `react-router-dom`, настроить единый persistent React-остров.
- **Шаги реализации**:
  1. Перенести `src/pages/Timer.tsx` → `src/views/TimerView.tsx`.
  2. Перенести `src/pages/Settings.tsx` → `src/views/SettingsView.tsx`.
  3. В `Header`, `Footer`, `MobileMenu`, `LangMenu`:
     - Заменить использование `useNavigate()` и `useLocation()` из `react-router-dom` на нативную навигацию Astro.
     - Создать вспомогательный хук `useAppNavigate()`:
       ```ts
       import { navigate } from 'astro:transitions/client';

       export const useAppNavigate = () => {
         return (to: string) => {
           const baseUrl = import.meta.env.BASE_URL.replace(/\/$/, '');
           const cleanTo = to.startsWith('/') ? to : `/${to}`;
           navigate(`${baseUrl}${cleanTo}`);
         };
       };
       ```
     - Использовать атрибут `transition:persist="pomotomo-app"` для корневого контейнера `AppShell.tsx`.
  4. Создать `src/app/AppShell.tsx`:
     - Оборачивает переданные дочерние элементы в `Provider` (`ChakraProvider` + `ColorModeProvider`).
     - Монтирует `Layout`, `Header`, `Footer`, `MobileMenu`, `LangMenu` и `Toaster`.
     - Принимает проп `currentView: 'timer' | 'settings'` и `locale: string`.
- **Критерии приёмки**:
  - В проекте нет ни одного импорта из `react-router-dom`.
  - При переключении с экрана таймера на настройки таймер продолжает обратный отсчет в фоне без сброса.

---

### Задача 5: Реализация страниц Astro SSG и мультиязычного роутинга

- **Цель**: создать генерацию статических HTML страниц для всех поддерживаемых языков и маршрутов.
- **Шаги реализации**:
  1. Создать `src/data/locales.ts` со словарем поддерживаемых языков (`en`, `ru`, `de`) и SEO-метаданными для каждого языка.
  2. Создать страницы по следующей структуре:
     - `src/pages/index.astro` — английская версия главной страницы (`/pomodoro/`).
     - `src/pages/settings.astro` — английская версия настроек (`/pomodoro/settings`).
     - `src/pages/[lang]/index.astro` — локализованная главная страница (`/pomodoro/ru/`, `/pomodoro/de/`). Использует `export function getStaticPaths()`:
       ```ts
       export function getStaticPaths() {
         return [{ params: { lang: 'ru' } }, { params: { lang: 'de' } }];
       }
       ```
     - `src/pages/[lang]/settings.astro` — локализованные настройки (`/pomodoro/ru/settings`, `/pomodoro/de/settings`).
  3. В каждой Astro-странице подключать `BaseLayout` с соответствующими локализованными `title`, `description` и передавать `locale` в React-остров `AppShell`:
     ```astro
     ---
     import BaseLayout from '../../layouts/BaseLayout.astro';
     import AppShell from '../../app/AppShell';
     import TimerView from '../../views/TimerView';
     ---
     <BaseLayout title={title} description={description} lang={locale}>
       <AppShell client:load locale={locale} currentView="timer">
         <TimerView client:load />
       </AppShell>
     </BaseLayout>
     ```
  4. В `LangMenu.tsx` настроить переключение языка: переход на маршрут выбранного языка с сохранением текущего экрана (`/` ↔ `/ru/` или `/settings` ↔ `/ru/settings`).
- **Критерии приёмки**:
  - `bun run build` генерирует в `dist/` статические файлы:
    - `dist/index.html`
    - `dist/settings/index.html`
    - `dist/ru/index.html`
    - `dist/ru/settings/index.html`
    - `dist/de/index.html`
    - `dist/de/settings/index.html`
  - Каждая страница содержит правильный `<html lang="...">` и предрендеренный SEO-заголовок.

---

### Задача 6: Интеграция `@astrojs/sitemap` и PWA

- **Цель**: обеспечить автогенерацию карты сайта со всеми языковыми альтернативами и корректную регистрацию Service Worker.
- **Шаги реализации**:
  1. Удалить устаревший ручной файл `public/sitemap.xml`.
  2. Обновить `public/robots.txt`:
     ```
     User-agent: *
     Allow: /
     Sitemap: https://mirislamus.github.io/pomodoro/sitemap-index.xml
     ```
  3. Убедиться, что PWA манифест генерируется в сборке и подключается через `<link rel="manifest" href="/pomodoro/manifest.webmanifest">`.
  4. Проверить в `BaseLayout.astro` регистрацию Service Worker (AstroPWA автоматически инжектирует необходимый клиентский скрипт).
- **Критерии приёмки**:
  - В каталоге `dist/` формируются `sitemap-index.xml` и `sitemap-0.xml`, содержащие все 6 сгенерированных страниц и атрибуты `xhtml:link rel="alternate"`.
  - Манифест приложения валиден и доступен.

---

### Задача 7: Адаптация тестов Playwright, скриптов и GitHub Actions CI/CD

- **Цель**: перенастроить тестовый контур и CI/CD для работы с Astro SSG.
- **Шаги реализации**:
  1. В `playwright.config.ts` обновить команду запуска сервера предварительного просмотра:
     ```ts
     webServer: {
       command: process.env.CI
         ? 'bun run preview -- --host 127.0.0.1 --port 4173'
         : 'bun run build && bun run preview -- --host 127.0.0.1 --port 4173',
       url: baseURL,
       reuseExistingServer: !process.env.CI,
     }
     ```
  2. В `tests/e2e/smoke.spec.ts`:
     - Актуализировать тесты с учетом переходов по ссылкам Astro.
     - Добавить тест проверки открытия локализованных маршрутов (`/ru/`, `/de/`).
     - Добавить проверку доступности `sitemap-index.xml`.
  3. В `.github/workflows/deploy.yml`:
     - Удалить шаг `Check JavaScript budget` (`bun run check:js-budget`).
     - Заменить шаг `Build project` на `bun run build` (включающий `typegen`, `typecheck` и `astro build`).
     - Убедиться, что артефакт `dist` выгружается и публикуется в GitHub Pages без сбоев.
- **Критерии приёмки**:
  - Локальный запуск `bun run test:e2e` и `bun run test:a11y` завершается с кодом 0 (100% тестов пройдены).
  - CI пайплайн успешно проходит этапы `verify` и `deploy`.

---

### Задача 8: Скриншотное регрессионное тестирование и финальная приёмка UI (1 в 1)

- **Цель**: подтвердить, что перенос на Astro не изменил визуальное отображение ни на один пиксель.
- **Шаги реализации**:
  1. Запустить сверку скриншотов Playwright против сохраненных baseline-снимков:
     - `timer-light-1280x720.png`
     - `timer-dark-1280x720.png`
     - `timer-light-320x642.png`
     - `timer-dark-320x642.png`
  2. Провести ручную и автоматическую проверку:
     - Сохранение настроек в `localStorage` после перезагрузки страницы.
     - Воспроизведение звуков (Bell, Digital и др.) и звука тиканья.
     - Запрос разрешения на браузерные уведомления.
     - Работа свайпов и мобильного меню (MobileMenu drawer).
     - Поведение селекторов стадий (Pomodoro, Short Break, Long Break).
  3. Зафиксировать результаты в итоговом отчете.
- **Критерии приёмки**:
  - Скриншотные тесты идентичности проходят без недопустимых расхождений.
  - UI полностью совпадает 1 в 1 с исходным приложением.

---

## 7. Чек-лист проверки готовности (Definition of Done)

- [x] В проекте отсутствуют ссылки на `react-router-dom` и неиспользуемые плагины Vite.
- [x] Команда `bun run build` успешно генерирует статическую директорию `dist/` с HTML-файлами всех страниц и локалей.
- [x] Команда `bun run typecheck` (`astro check && tsc --noEmit`) проходит без единой ошибки.
- [x] Команда `bun run lint` проходит чисто.
- [x] Все E2E тесты Playwright (smoke, a11y, screenshot regression) завершаются успешно.
- [x] Переключение языка на лету через LangMenu работает плавно, меняя URL и обновляя контент.
- [x] При переходе между таймером и настройками таймер не сбрасывается и аудиопоток не обрывается.
- [x] Тема (Light/Dark) загружается мгновенно без FOUC-эффекта.
- [x] Карта сайта `sitemap-index.xml` формируется автоматически и доступна по адресу `https://mirislamus.github.io/pomodoro/sitemap-index.xml`.
- [x] PWA манифест и Service Worker функционируют в офлайн-режиме.
