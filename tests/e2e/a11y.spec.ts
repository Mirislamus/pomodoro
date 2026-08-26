import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const seriousOrCriticalBaseline: Record<string, number> = {
  'button-name': 4,
  'color-contrast': 1,
  'link-name': 1,
};

test('@a11y does not add serious or critical violations', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'chromium', 'Axe baseline is collected once in desktop Chromium.');

  await page.goto('./');

  const { violations } = await new AxeBuilder({ page }).analyze();
  const blockingViolations = violations.filter(({ impact }) => impact === 'serious' || impact === 'critical');
  const unexpectedRules = blockingViolations
    .map(({ id }) => id)
    .filter(id => seriousOrCriticalBaseline[id] === undefined);

  expect(unexpectedRules, 'Unexpected serious or critical axe rules').toEqual([]);

  for (const { id, nodes } of blockingViolations) {
    expect(nodes.length, `${id} exceeds the recorded baseline`).toBeLessThanOrEqual(seriousOrCriticalBaseline[id]);
  }
});
