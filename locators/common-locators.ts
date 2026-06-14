import { Locator, Page } from '@playwright/test';

export class CommonLocators {
  constructor(protected readonly page: Page) {}

  protected roleLinkName(name: string): Locator {
    return this.page.getByRole('link', { name, exact: true });
  }

  protected roleButtonName(name: string): Locator {
    return this.page.getByRole('button', { name, exact: true });
  }

  protected placeholder(value: string): Locator {
    return this.page.getByPlaceholder(value, { exact: true });
  }

  protected exactText(value: string): Locator {
    return this.page.getByText(value, { exact: true });
  }
}
