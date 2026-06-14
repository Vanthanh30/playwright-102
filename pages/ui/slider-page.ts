import { Page } from '@playwright/test';
import { SliderLocators } from '@locators/slider-locators';
import { SliderData } from '@models/playground-scenarios';
import { AssertHelper } from '@utilities/assert-helper';
import { Constants } from '@utilities/constants';
import { step } from '@utilities/logging';
import { CommonPage } from '../common-page';

export class SliderPage extends SliderLocators {
  private readonly commonPage: CommonPage;
  private readonly assertHelper: AssertHelper;

  constructor(page: Page) {
    super(page);
    this.commonPage = new CommonPage(page);
    this.assertHelper = new AssertHelper(page);
  }

  @step('Open the Drag and Drop Sliders demo')
  async navigateToDemo(): Promise<void> {
    await this.commonPage.blockResources(
      Constants.THIRD_PARTY_RESOURCE_PATTERN,
    );
    await this.commonPage.navigate(Constants.PLAYGROUND_ROOT);
    await this.assertHelper.assertPageHasURLAfterAction(
      Constants.SLIDER_PATH,
      async () => {
        await this.commonPage.click(this.sliderDemoLink);
      },
    );
    await this.assertHelper.assertElementIsReactHydrated(
      this.defaultValue15Slider,
    );
  }

  @step('Verify the initial slider value')
  async verifyInitialValue(data: SliderData): Promise<void> {
    await this.assertHelper.assertElementHasValue(
      this.defaultValue15Slider,
      String(data.initialValue),
    );
  }

  @step('Drag the slider to the target value')
  async dragSliderToTarget(data: SliderData): Promise<void> {
    await this.assertHelper.assertElementHasTextAfterAction(
      this.defaultValue15Output,
      String(data.targetValue),
      async () => {
        await this.commonPage.dragRangeSlider(
          this.defaultValue15Slider,
          data.targetValue,
        );
      },
    );
  }

  @step('Verify the target slider value')
  async verifyTargetValue(data: SliderData): Promise<void> {
    const expectedValue = String(data.targetValue);
    await this.assertHelper.assertElementHasValue(
      this.defaultValue15Slider,
      expectedValue,
    );
    await this.assertHelper.assertElementHasText(
      this.defaultValue15Output,
      expectedValue,
    );
  }
}
