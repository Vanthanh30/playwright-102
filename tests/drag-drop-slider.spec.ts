import { sliderData } from '@data/playground-data';
import { test } from '@pages/base-page';

test.describe('Drag and Drop Sliders', () => {
  test(
    'shows 95 after dragging the default value 15 slider',
    { tag: ['@smoke', '@regression', '@slider'] },
    async ({ sliderPage }) => {
      await sliderPage.navigateToDemo();
      await sliderPage.verifyInitialValue(sliderData);
      await sliderPage.dragSliderToTarget(sliderData);
      await sliderPage.verifyTargetValue(sliderData);
    },
  );
});
