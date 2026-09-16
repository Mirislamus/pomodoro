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
        launch_handler: {
          client_mode: 'focus-existing',
        },
        dir: 'ltr',
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
        screenshots: [
          {
            src: 'images/screenshots/screenshot-1280x720.png',
            sizes: '1280x720',
            type: 'image/png',
            form_factor: 'wide',
          },
          {
            src: 'images/screenshots/screenshot-320x642.png',
            sizes: '320x642',
            type: 'image/png',
            form_factor: 'narrow',
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
