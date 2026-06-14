import { expect, Locator, Page } from '@playwright/test';

export class AssertHelper {
  constructor(private readonly page: Page) {}

  async assertPageHasURL(expectedPath: RegExp): Promise<void> {
    await expect(this.page).toHaveURL(expectedPath);
  }

  async assertPageHasURLAfterAction(
    expectedPath: RegExp,
    action: () => Promise<void>,
  ): Promise<void> {
    await expect
      .poll(
        async () => {
          if (!expectedPath.test(this.page.url())) {
            await action();
          }
          return this.page.url();
        },
        { intervals: [250, 500, 1_000], timeout: 10_000 },
      )
      .toMatch(expectedPath);
  }

  async assertElementHasValue(
    locator: Locator,
    expectedValue: string,
  ): Promise<void> {
    await expect(locator).toHaveValue(expectedValue);
  }

  async assertElementHasValueAfterAction(
    locator: Locator,
    expectedValue: string,
    action: () => Promise<void>,
  ): Promise<void> {
    await expect
      .poll(
        async () => {
          await action();
          return locator.inputValue();
        },
        { intervals: [250, 500, 1_000], timeout: 10_000 },
      )
      .toBe(expectedValue);
  }

  async assertElementHasText(
    locator: Locator,
    expectedText: string,
  ): Promise<void> {
    await expect(locator).toHaveText(expectedText);
  }

  async assertElementIsVisible(locator: Locator): Promise<void> {
    await expect(locator).toBeVisible();
  }

  async assertElementIsReactHydrated(locator: Locator): Promise<void> {
    await expect
      .poll(
        async () =>
          locator.evaluate((element) =>
            Object.keys(element).some((key) =>
              key.startsWith('__reactProps'),
            ),
          ),
        { intervals: [250, 500, 1_000], timeout: 20_000 },
      )
      .toBe(true);
  }

  async assertElementHasTextAfterAction(
    locator: Locator,
    expectedText: string,
    action: () => Promise<void>,
  ): Promise<void> {
    await expect
      .poll(
        async () => {
          await action();
          return locator.textContent();
        },
        { intervals: [250, 500, 1_000], timeout: 10_000 },
      )
      .toBe(expectedText);
  }

  async assertRequiredValidation(
    locator: Locator,
    expectedMessage: string,
  ): Promise<void> {
    await expect
      .poll(async () =>
        locator.evaluate((element: HTMLInputElement) => ({
          message: element.validationMessage.replace(
            'Please fill out this field.',
            'Please fill in this field.',
          ),
          valueMissing: element.validity.valueMissing,
        })),
      )
      .toEqual({
        message: expectedMessage,
        valueMissing: true,
      });
  }
}
