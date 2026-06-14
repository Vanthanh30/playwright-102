import { contactFormData } from '@data/playground-data';
import { test } from '@pages/base-page';

test.describe('Input Form Submit', () => {
  test(
    'shows required validation and accepts a complete contact form',
    { tag: ['@critical', '@regression', '@input-form'] },
    async ({ inputFormPage }) => {
      await inputFormPage.navigateToDemo();
      await inputFormPage.submitEmptyFormAndVerifyValidation();
      await inputFormPage.fillContactForm(contactFormData);
      await inputFormPage.submitForm();
      await inputFormPage.verifySubmissionSuccess();
    },
  );
});
