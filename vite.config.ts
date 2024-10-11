import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import meta from './src/data/meta';

export default defineConfig({
  resolve: {
    alias: {
      '@components': './src/components',
    },
  },
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: '.htaccess',
          dest: '',
        },
        {
          src: 'robots.txt',
          dest: '',
        },
        {
          src: 'sitemap.xml',
          dest: '',
        },
      ],
    }),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: meta.title,
        short_name: meta.short_name,
        description: meta.description,
        theme_color: meta.color,
        background_color: meta.color,
        id: '/',
        start_url: '/',
        scope: '/',
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
            src: '/images/icons/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/images/icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
        screenshots: [
          {
            src: '/images/screenshots/screenshot-1280x720.png',
            sizes: '1280x720',
            type: 'image/png',
            form_factor: 'wide',
          },
          {
            src: '/images/screenshots/screenshot-320x642.png',
            sizes: '320x642',
            type: 'image/png',
            form_factor: 'narrow',
          },
        ],
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: ({ url }) => url.pathname.startsWith('/images/'),
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
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor';
          }
          if (id.includes('src/components/')) {
            return 'components';
          }
        },
      },
    },
  },
});
