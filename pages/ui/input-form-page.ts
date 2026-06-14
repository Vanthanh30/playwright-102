import { Page } from '@playwright/test';
import { InputFormLocators } from '@locators/input-form-locators';
import { ContactFormData } from '@models/playground-scenarios';
import { TRANSLATIONS } from '@translations/translations';
import { AssertHelper } from '@utilities/assert-helper';
import { Constants } from '@utilities/constants';
import { step } from '@utilities/logging';
import { CommonPage } from '../common-page';

export class InputFormPage extends InputFormLocators {
  private readonly commonPage: CommonPage;
  private readonly assertHelper: AssertHelper;

  constructor(page: Page) {
    super(page);
    this.commonPage = new CommonPage(page);
    this.assertHelper = new AssertHelper(page);
  }

  @step('Open the Input Form Submit demo')
  async navigateToDemo(): Promise<void> {
    await this.commonPage.blockResources(
      Constants.THIRD_PARTY_RESOURCE_PATTERN,
    );
    await this.commonPage.navigate(Constants.PLAYGROUND_ROOT);
    await this.assertHelper.assertPageHasURLAfterAction(
      Constants.INPUT_FORM_PATH,
      async () => {
        await this.commonPage.click(this.inputFormDemoLink);
      },
    );
    await this.assertHelper.assertElementIsReactHydrated(this.nameInput);
  }

  @step('Submit the empty form and verify required validation')
  async submitEmptyFormAndVerifyValidation(): Promise<void> {
    await this.commonPage.click(this.submitButton);
    await this.assertHelper.assertRequiredValidation(
      this.nameInput,
      TRANSLATIONS[Constants.LANGUAGE].messages.requiredField,
    );
  }

  @step('Fill all contact form fields')
  async fillContactForm(data: ContactFormData): Promise<void> {
    await this.commonPage.fill(this.nameInput, data.name);
    await this.commonPage.fill(this.emailInput, data.email);
    await this.commonPage.fill(this.passwordInput, data.password);
    await this.commonPage.fill(this.companyInput, data.company);
    await this.commonPage.fill(this.websiteInput, data.website);
    await this.commonPage.selectOptionByLabel(
      this.countrySelect,
      data.country,
    );
    await this.commonPage.fill(this.cityInput, data.city);
    await this.commonPage.fill(this.address1Input, data.address1);
    await this.commonPage.fill(this.address2Input, data.address2);
    await this.commonPage.fill(this.stateInput, data.state);
    await this.commonPage.fill(this.zipCodeInput, data.zipCode);
  }

  @step('Submit the completed form')
  async submitForm(): Promise<void> {
    await this.commonPage.click(this.submitButton);
  }

  @step('Verify the contact form success message')
  async verifySubmissionSuccess(): Promise<void> {
    await this.assertHelper.assertElementIsVisible(this.successMessage);
  }
}
