import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      statements: 100,
      branches: 100,
      functions: 100,
      lines: 100,
      exclude: [
        'node_modules/',
        'dist/',
        'tests/',
        'examples/',
        'website/',
        '**/*.test.ts',
        '**/*.test.tsx',
        '**/*.config.*',
      ],
    },
  },
})
