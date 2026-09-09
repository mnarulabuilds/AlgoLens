/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
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
