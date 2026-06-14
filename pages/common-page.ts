import { Locator, Page } from '@playwright/test';
import { Assertions } from '@utilities/assertions';

interface RangeMetadata {
  min: number;
  max: number;
  value: number;
}

export class CommonPage {
  constructor(private readonly page: Page) {}

  async blockResources(pattern: RegExp): Promise<void> {
    await this.page.route(pattern, (route) => route.abort());
  }

  async navigate(url: string): Promise<void> {
    await this.page.goto(url);
  }

  async click(locator: Locator): Promise<void> {
    await locator.click();
  }

  async fill(locator: Locator, value: string): Promise<void> {
    await locator.fill(value);
  }

  async selectOptionByLabel(locator: Locator, label: string): Promise<void> {
    await locator.selectOption({ label });
  }

  async inputValue(locator: Locator): Promise<string> {
    return locator.inputValue();
  }

  async dragRangeSlider(locator: Locator, targetValue: number): Promise<void> {
    const box = await locator.boundingBox();
    Assertions.assertDefined(box, 'The range slider must be visible.');

    const range = await locator.evaluate(
      (element: HTMLInputElement): RangeMetadata => ({
        min: Number(element.min || 0),
        max: Number(element.max || 100),
        value: Number(element.value),
      }),
    );
    const positionFor = (value: number): number =>
      box.x + (box.width * (value - range.min)) / (range.max - range.min);
    const y = box.y + box.height / 2;

    await this.page.mouse.move(positionFor(range.value), y);
    await this.page.mouse.down();
    await this.page.mouse.move(positionFor(targetValue), y, { steps: 20 });
    await this.page.mouse.up();

    const draggedValue = Number(await locator.inputValue());
    const key =
      draggedValue < targetValue ? 'ArrowRight' : 'ArrowLeft';

    for (let value = draggedValue; value !== targetValue; ) {
      await locator.press(key);
      value += key === 'ArrowRight' ? 1 : -1;
    }

    if (draggedValue === targetValue) {
      const awayFromTarget =
        targetValue > range.min ? 'ArrowLeft' : 'ArrowRight';
      const backToTarget =
        awayFromTarget === 'ArrowLeft' ? 'ArrowRight' : 'ArrowLeft';
      await locator.press(awayFromTarget);
      await locator.press(backToTarget);
    }
  }
}
