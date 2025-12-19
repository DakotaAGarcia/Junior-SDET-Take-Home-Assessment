import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  use: {
    baseURL: 'https://playwright.dev',
    trace: 'on-first-retry',

    // Stabilize visual snapshots
    viewport: { width: 1280, height: 720 },
    deviceScaleFactor: 1,

    // Optional but helps reduce tiny diffs across runs
    locale: 'en-US',
    timezoneId: 'America/New_York',
  },
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        // Ensure these override device defaults
        viewport: { width: 1280, height: 720 },
        deviceScaleFactor: 1,
      },
    },
  ],
});
