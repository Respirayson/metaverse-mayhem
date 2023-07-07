import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./tests/setup.js'],
    testMatch: ['./tests/**/*.test.jsx'],
    deps: {
      inline: ['vitest-canvas-mock'],
    },
    threads: false,
    environmentOptions: {
      jsdom: {
        resources: 'usable',
      },
    },
    globals: true,
    coverage: {
      provider: 'c8',
      reporter: ['text', 'json', 'html'],
    },
    css: {
      modules: {
          classNameStrategy: 'non-scoped'
      }
  }
  }
})
