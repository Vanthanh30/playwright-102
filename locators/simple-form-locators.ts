import { Locator, Page } from '@playwright/test';
import { TRANSLATIONS } from '@translations/translations';
import { Constants } from '@utilities/constants';
import { CommonLocators } from './common-locators';

export class SimpleFormLocators extends CommonLocators {
  readonly simpleFormDemoLink: Locator;
  readonly messageInput: Locator;
  readonly getCheckedValueButton: Locator;
  readonly displayedMessage: Locator;

  constructor(page: Page) {
    super(page);
    const text = TRANSLATIONS[Constants.LANGUAGE];
    this.simpleFormDemoLink = this.roleLinkName(text.demos.simpleForm);
    this.messageInput = this.placeholder(text.placeholders.message);
    this.getCheckedValueButton = page.locator('#showInput');
    this.displayedMessage = page.locator('#message');
  }
}
