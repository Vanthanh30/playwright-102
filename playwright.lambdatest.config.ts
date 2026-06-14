import { defineConfig } from '@playwright/test';
import baseConfig from './playwright.config';

const username = process.env.LT_USERNAME;
const accessKey = process.env.LT_ACCESS_KEY;
process.env.LT_AUTOMATION = 'true';

if (!username || !accessKey) {
  throw new Error(
    'LT_USERNAME and LT_ACCESS_KEY must be defined in the environment.',
  );
}

const capabilities = {
  browserName: 'pw-webkit',
  browserVersion: 'latest',
  'LT:Options': {
    platform: 'macOS Sonoma',
    build:
      process.env.LT_BUILD_NAME ??
      'Playwright 102 Automation Build',
    name:
      process.env.LT_TEST_NAME ??
      'Playwright 102 - WebKit on macOS Sonoma',
    user: username,
    accessKey,
    network: true,
    video: true,
    console: true,
    resolution: '1920x1080',
  },
};

export default defineConfig({
  ...baseConfig,
  fullyParallel: false,
  workers: 1,
  use: {
    ...baseConfig.use,
    video: 'off',
    connectOptions: {
      wsEndpoint: `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(
        JSON.stringify(capabilities),
      )}`,
      timeout: 120_000,
    },
  },
  projects: [
    {
      name: 'lambdatest-webkit-macos-sonoma',
      use: {
        browserName: 'webkit',
      },
    },
  ],
});
