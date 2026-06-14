import { test as base } from '@playwright/test';
import { InputFormPage } from './ui/input-form-page';
import { SimpleFormPage } from './ui/simple-form-page';
import { SliderPage } from './ui/slider-page';

interface PlaygroundFixtures {
  simpleFormPage: SimpleFormPage;
  sliderPage: SliderPage;
  inputFormPage: InputFormPage;
}

export const test = base.extend<PlaygroundFixtures>({
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
