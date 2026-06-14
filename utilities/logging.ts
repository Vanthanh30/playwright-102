import { test } from '@playwright/test';

export function step<
  This,
  Args extends unknown[],
  Return extends Promise<unknown>,
>(name: string) {
  return function (
    method: (this: This, ...args: Args) => Return,
    _context: ClassMethodDecoratorContext<
      This,
      (this: This, ...args: Args) => Return
    >,
  ) {
    return function (this: This, ...args: Args): Return {
      return test.step(name, () => method.apply(this, args)) as Return;
    };
  };
}
