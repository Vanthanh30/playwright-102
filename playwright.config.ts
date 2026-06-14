import { defineConfig, devices } from '@playwright/test';

const isCI = Boolean(process.env.CI || process.env.HYPEREXECUTE);

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: isCI,
  retries: 0,
  workers: isCI ? 2 : undefined,
  timeout: 60_000,
  expect: {
    timeout: 10_000,
  },
  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['junit', { outputFile: 'test-results/junit-results.xml' }],
  ],
  use: {
    baseURL:
      process.env.PLAYGROUND_URL ??
      'https://www.testmuai.com/selenium-playground/',
    actionTimeout: 15_000,
    navigationTimeout: 30_000,
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
    video: 'retain-on-failure',
  },
  outputDir: 'test-results/artifacts',
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        browserName: 'chromium',
      },
    },
  ],
});
