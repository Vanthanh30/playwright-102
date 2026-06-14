import { Locator, Page } from '@playwright/test';
import { TRANSLATIONS } from '@translations/translations';
import { Constants } from '@utilities/constants';
import { CommonLocators } from './common-locators';

export class InputFormLocators extends CommonLocators {
  readonly inputFormDemoLink: Locator;
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly companyInput: Locator;
  readonly websiteInput: Locator;
  readonly countrySelect: Locator;
  readonly cityInput: Locator;
  readonly address1Input: Locator;
  readonly address2Input: Locator;
  readonly stateInput: Locator;
  readonly zipCodeInput: Locator;
  readonly submitButton: Locator;
  readonly successMessage: Locator;

  constructor(page: Page) {
    super(page);
    const text = TRANSLATIONS[Constants.LANGUAGE];
    this.inputFormDemoLink = this.roleLinkName(text.demos.inputForm);
    this.nameInput = this.placeholder(text.placeholders.name);
    this.emailInput = this.placeholder(text.placeholders.email);
    this.passwordInput = this.placeholder(text.placeholders.password);
    this.companyInput = this.placeholder(text.placeholders.company);
    this.websiteInput = this.placeholder(text.placeholders.website);
    this.countrySelect = page.locator('select[name="country"]');
    this.cityInput = this.placeholder(text.placeholders.city);
    this.address1Input = this.placeholder(text.placeholders.address1);
    this.address2Input = this.placeholder(text.placeholders.address2);
    this.stateInput = this.placeholder(text.placeholders.state);
    this.zipCodeInput = this.placeholder(text.placeholders.zipCode);
    this.submitButton = this.roleButtonName(text.labels.submit);
    this.successMessage = this.exactText(text.messages.contactSuccess);
  }
}
