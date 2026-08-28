import { defineConfig, devices } from '@playwright/test';
const ddevHostname = process.env.DDEV_HOSTNAME || process.env.VIRTUAL_HOST;

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: 'html',
  use: {
    baseURL:
      process.env.PLAYWRIGHT_BASE_URL ??
      (ddevHostname ? `https://${ddevHostname}` : 'https://gesso.ddev.site'),
    ignoreHTTPSErrors: true,
    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    /* Test against mobile viewports. */
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 7'] },
    },

    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 15'] },
    // },
  ],
});
