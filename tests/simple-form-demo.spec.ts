import { simpleMessageData } from '@data/playground-data';
import { test } from '@pages/base-page';

test.describe('Simple Form Demo', () => {
  test(
    'displays the same message entered by the user',
    { tag: ['@smoke', '@regression', '@simple-form'] },
    async ({ simpleFormPage }) => {
      await simpleFormPage.navigateToDemo();
      await simpleFormPage.enterMessage(simpleMessageData);
      await simpleFormPage.submitAndVerifyMessage(simpleMessageData);
    },
  );
});
