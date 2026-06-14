import { Page } from '@playwright/test';
import { SimpleFormLocators } from '@locators/simple-form-locators';
import { SimpleMessageData } from '@models/playground-scenarios';
import { AssertHelper } from '@utilities/assert-helper';
import { Constants } from '@utilities/constants';
import { step } from '@utilities/logging';
import { CommonPage } from '../common-page';

export class SimpleFormPage extends SimpleFormLocators {
  private readonly commonPage: CommonPage;
  private readonly assertHelper: AssertHelper;

  constructor(page: Page) {
    super(page);
    this.commonPage = new CommonPage(page);
    this.assertHelper = new AssertHelper(page);
  }

  @step('Open the Simple Form Demo from Selenium Playground')
  async navigateToDemo(): Promise<void> {
    await this.commonPage.blockResources(
      Constants.THIRD_PARTY_RESOURCE_PATTERN,
    );
    await this.commonPage.navigate(Constants.PLAYGROUND_ROOT);
    await this.assertHelper.assertPageHasURLAfterAction(
      Constants.SIMPLE_FORM_PATH,
      async () => {
        await this.commonPage.click(this.simpleFormDemoLink);
      },
    );
  }

  @step('Enter the configured message')
  async enterMessage(data: SimpleMessageData): Promise<void> {
    await this.assertHelper.assertElementHasValueAfterAction(
      this.messageInput,
      data.message,
      async () => {
        await this.commonPage.fill(this.messageInput, data.message);
      },
    );
  }

  @step('Submit and verify the displayed message')
  async submitAndVerifyMessage(data: SimpleMessageData): Promise<void> {
    await this.assertHelper.assertElementHasTextAfterAction(
      this.displayedMessage,
      data.message,
      async () => {
        await this.commonPage.fill(this.messageInput, data.message);
        await this.commonPage.click(this.getCheckedValueButton);
      },
    );
  }
}
