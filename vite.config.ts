import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'PomoTomo Focus Timer',
        short_name: 'PomoTomo',
        description:
          'PomoTomo is your personal Pomodoro timer to increase productivity. Work efficiently by dividing tasks into short sessions with breaks. Ideal for focusing and completing tasks.',
        theme_color: '#ED4455',
        background_color: '#ED4455',
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
      workbox: {},
    }),
  ],
  server: {
    port: 3000,
  },
});
