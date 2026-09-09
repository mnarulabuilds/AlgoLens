/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'logo192.png', 'logo512.png'],
      manifest: {
        name: 'AlgoLens: Algorithm & Data Structure Visualizations',
        short_name: 'AlgoLens',
        description:
          'An interactive platform to visualize complex computer science concepts through immersive demonstrations.',
        theme_color: '#162788',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: '.',
        icons: [
          {
            src: 'logo192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any maskable',
          },
          {
            src: 'logo512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
        navigateFallback: 'index.html',
        mode: 'production',
      },
      devOptions: {
        enabled: false,
      },
    }),
  ],
  base: process.env.GITHUB_PAGES === 'true' ? '/AlgoLens/' : '/',
  resolve: {
    alias: {
      'base': path.resolve(__dirname, './src/base'),
      'common': path.resolve(__dirname, './src/common'),
      'dashboard': path.resolve(__dirname, './src/dashboard'),
      'routing': path.resolve(__dirname, './src/routing'),
      'src': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
  },
  build: {
    outDir: 'build',
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
        },
      },
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov'],
      include: ['src/common/**', 'src/routing/base/**'],
      thresholds: {
        lines: 45,
        functions: 15,
        branches: 35,
        statements: 45,
      },
    },
  },
});
