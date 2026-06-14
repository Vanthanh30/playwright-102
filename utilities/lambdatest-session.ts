import { Page, TestInfo } from '@playwright/test';

interface LambdaTestDetails {
  test_id: string;
  build_id: number;
}

interface LambdaTestDetailsResponse {
  data: LambdaTestDetails;
}

const loggedTestIds = new Set<string>();

async function runLambdaTestAction(
  page: Page,
  action: string,
  args?: Record<string, string>,
): Promise<unknown> {
  const command = `lambdatest_action: ${JSON.stringify({
    action,
    arguments: args,
  })}`;

  return page.evaluate<unknown, string>(() => undefined, command);
}

export async function logLambdaTestDetails(page: Page): Promise<void> {
  const response = await runLambdaTestAction(page, 'getTestDetails');
  const parsed =
    typeof response === 'string'
      ? (JSON.parse(response) as LambdaTestDetailsResponse)
      : (response as LambdaTestDetailsResponse);
  const details = parsed.data;

  if (loggedTestIds.has(details.test_id)) {
    return;
  }
  loggedTestIds.add(details.test_id);

  console.log(`[LambdaTest] Test ID: ${details.test_id}`);
  console.log(`[LambdaTest] Build ID: ${details.build_id}`);
  console.log(
    `[LambdaTest] Dashboard: https://automation.lambdatest.com/test?build=${details.build_id}&testID=${details.test_id}`,
  );
}

export async function setLambdaTestStatus(
  page: Page,
  testInfo: TestInfo,
): Promise<void> {
  const passed = testInfo.status === testInfo.expectedStatus;
  await runLambdaTestAction(page, 'setTestStatus', {
    status: passed ? 'passed' : 'failed',
    remark: passed
      ? `${testInfo.title} passed`
      : testInfo.error?.message ?? `${testInfo.title} failed`,
  });
}
