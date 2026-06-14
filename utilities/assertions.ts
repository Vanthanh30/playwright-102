import { expect } from '@playwright/test';

export class Assertions {
  static assertDefined<T>(
    value: T | null | undefined,
    message: string,
  ): asserts value is T {
    expect(value, message).toBeDefined();
    expect(value, message).not.toBeNull();
  }
}
