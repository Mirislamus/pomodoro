import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import meta from './src/data/meta';

export default defineConfig({
  plugins: [
    react(),
    // VitePWA({
    //   registerType: 'autoUpdate',
    //   manifest: {
    //     name: meta.title,
    //     short_name: meta.short_name,
    //     description: meta.description,
    //     theme_color: meta.color,
    //     background_color: meta.color,
    //     icons: [
    //       {
    //         src: '/images/icons/icon-192x192.png',
    //         sizes: '192x192',
    //         type: 'image/png',
    //       },
    //       {
    //         src: '/images/icons/icon-512x512.png',
    //         sizes: '512x512',
    //         type: 'image/png',
    //       },
    //     ],
    //     screenshots: [
    //       {
    //         src: '/images/screenshots/screenshot-1280x720.png',
    //         sizes: '1280x720',
    //         type: 'image/png',
    //         form_factor: 'wide',
    //       },
    //       {
    //         src: '/images/screenshots/screenshot-320x642.png',
    //         sizes: '320x642',
    //         type: 'image/png',
    //         form_factor: 'narrow',
    //       },
    //     ],
    //   },
    // }),
  ],
  server: {
    port: 3000,
  },
});
