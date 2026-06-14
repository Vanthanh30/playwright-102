import { test as base } from '@playwright/test';
import {
  logLambdaTestDetails,
  setLambdaTestStatus,
} from '@utilities/lambdatest-session';
import { InputFormPage } from './ui/input-form-page';
import { SimpleFormPage } from './ui/simple-form-page';
import { SliderPage } from './ui/slider-page';

interface PlaygroundFixtures {
  simpleFormPage: SimpleFormPage;
  sliderPage: SliderPage;
  inputFormPage: InputFormPage;
  lambdaTestSession: void;
}

export const test = base.extend<PlaygroundFixtures>({
  lambdaTestSession: [
    async ({ page }, use, testInfo) => {
      if (process.env.LT_AUTOMATION === 'true') {
        await logLambdaTestDetails(page);
      }

      await use();

      if (process.env.LT_AUTOMATION === 'true') {
        await setLambdaTestStatus(page, testInfo);
      }
    },
    { auto: true },
  ],
  simpleFormPage: async ({ page }, use) => {
    await use(new SimpleFormPage(page));
  },
  sliderPage: async ({ page }, use) => {
    await use(new SliderPage(page));
  },
  inputFormPage: async ({ page }, use) => {
    await use(new InputFormPage(page));
  },
});
