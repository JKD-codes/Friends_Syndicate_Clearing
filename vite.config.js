import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  server: {
    port: 5173,
    host: true,
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        about: resolve(import.meta.dirname, 'about.html'),
        services: resolve(import.meta.dirname, 'services.html'),
        fleet: resolve(import.meta.dirname, 'fleet.html'),
        contact: resolve(import.meta.dirname, 'contact.html'),
      },
    },
  },
});

