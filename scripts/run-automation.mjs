import { spawnSync } from 'node:child_process';

const testCases = [
  {
    spec: 'tests/simple-form-demo.spec.ts',
    name: 'Playwright 102 - Simple Form Demo',
  },
  {
    spec: 'tests/drag-drop-slider.spec.ts',
    name: 'Playwright 102 - Drag and Drop Sliders',
  },
  {
    spec: 'tests/input-form-submit.spec.ts',
    name: 'Playwright 102 - Input Form Submit',
  },
];

const buildName =
  process.env.LT_BUILD_NAME ??
  `Playwright 102 macOS WebKit ${new Date().toISOString()}`;
let failed = false;

for (const testCase of testCases) {
  console.log(`\nRunning ${testCase.name} on macOS Sonoma - WebKit`);

  const result = spawnSync(
    process.execPath,
    [
      'node_modules/@playwright/test/cli.js',
      'test',
      testCase.spec,
      '--config=playwright.lambdatest.config.ts',
      '--workers=1',
    ],
    {
      env: {
        ...process.env,
        LT_BUILD_NAME: buildName,
        LT_TEST_NAME: testCase.name,
      },
      stdio: 'inherit',
    },
  );

  if (result.status !== 0) {
    failed = true;
  }
}

process.exitCode = failed ? 1 : 0;
