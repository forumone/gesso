import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: {
    alias: {
      drupal: fileURLToPath(
        new URL('./.storybook/stubs/drupal.js', import.meta.url)
      ),
      once: fileURLToPath(
        new URL('./.storybook/stubs/once.js', import.meta.url)
      ),
    },
  },
  test: {
    environment: 'node',
    setupFiles: ['./vitest.setup.js'],
    include: ['**/*.test.js', '**/*.test.ts'],
    exclude: ['**/node_modules/**', 'dist/**'],
  },
});
