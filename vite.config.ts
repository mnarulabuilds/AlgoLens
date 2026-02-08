import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/AlgoLens/',
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
  },
});
