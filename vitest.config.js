import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    setupFiles: ['./vitest.setup.js'],
    include: ['**/*.test.js', '**/*.test.ts'],
    exclude: ['**/node_modules/**', 'dist/**'],
  },
});
