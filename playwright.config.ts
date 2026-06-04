import { defineConfig, devices } from '@playwright/test';

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    trace: 'on-first-retry',
    // Accept self-signed cert used by ddev.
    ignoreHTTPSErrors: true,
  },

  projects: [
    // Storybook visual regression — Chromium only so snapshots are
    // deterministic across machines. Baselines live in tests/snapshots/.
    {
      name: 'storybook-screenshots',
      testMatch: '**/storybook-screenshots.spec.ts',
      snapshotDir: './tests/snapshots',
      use: {
        ...devices['Desktop Chrome'],
        ignoreHTTPSErrors: true,
      },
    },

    // General functional tests.
    {
      name: 'chromium',
      testIgnore: '**/storybook-screenshots.spec.ts',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      testIgnore: '**/storybook-screenshots.spec.ts',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      testIgnore: '**/storybook-screenshots.spec.ts',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});
