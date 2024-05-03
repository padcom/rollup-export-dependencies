/* eslint-env node */
import { defineConfig } from 'vitest/config'
import { fileURLToPath } from 'url'

import eslint from 'vite-plugin-eslint'
import dts from 'vite-plugin-dts'

import pkg from './package.json' assert { type: 'json' }

export default defineConfig({
  plugins: [
    eslint({
      lintOnStart: false,
    }),
    dts({
      insertTypesEntry: true,
      rollupTypes: true,
      logLevel: 'error',
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    lib: {
      entry: './src/index.ts',
      name: pkg.name.split('/').at(-1),
    },
    sourcemap: true,
  },
  test: {
    setupFiles: [
      './vitest.setup.js',
    ],
    coverage: {
      enabled: true,
      reporter: ['text', 'lcov'],
    },
  },
})
