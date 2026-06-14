import { Locator, Page } from '@playwright/test';
import { TRANSLATIONS } from '@translations/translations';
import { Constants } from '@utilities/constants';
import { CommonLocators } from './common-locators';

export class SliderLocators extends CommonLocators {
  readonly sliderDemoLink: Locator;
  readonly defaultValue15Slider: Locator;
  readonly defaultValue15Output: Locator;

  constructor(page: Page) {
    super(page);
    const text = TRANSLATIONS[Constants.LANGUAGE];
    const sliderPanel = this.exactText(text.labels.defaultValue15).locator('..');
    this.sliderDemoLink = this.roleLinkName(text.demos.sliders);
    this.defaultValue15Slider = sliderPanel.locator('input[type="range"]');
    this.defaultValue15Output = sliderPanel.locator('output, span').last();
  }
}
