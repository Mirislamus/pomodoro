import { expect, test } from '@playwright/test';

test('user can open the timer and start a focus session', async ({ page }) => {
  const pageErrors: string[] = [];
  const failedFirstPartyRequests: string[] = [];

  page.on('pageerror', error => pageErrors.push(error.message));
  page.on('requestfailed', request => {
    if (new URL(request.url()).origin === new URL(page.url()).origin) {
      failedFirstPartyRequests.push(request.url());
    }
  });

  await page.goto('./');

  await expect(page.getByText('25:00', { exact: true })).toBeVisible();

  const startButton = page.getByRole('button', { name: /старт|start/i });
  await startButton.click();

  await expect(page.getByRole('button', { name: /пауза|pause/i })).toBeVisible();
  expect(pageErrors).toEqual([]);
  expect(failedFirstPartyRequests).toEqual([]);
});

test('user can change a timer setting and keep it after reload', async ({ page }) => {
  await page.goto('./');
  await page.getByText(/настройки|settings/i, { exact: true }).click();

  const pomodoroCount = page.getByLabel(/pomodoro count|количество помодоро/i);
  await pomodoroCount.fill('3');
  await page.reload();

  await expect(page.getByLabel(/pomodoro count|количество помодоро/i)).toHaveValue('3');
});

test('user can switch the color mode and keep it after reload', async ({ page }) => {
  await page.goto('./');
  await page.evaluate(() => localStorage.setItem('chakra-ui-color-mode', 'light'));
  await page.reload();

  await page.getByRole('button', { name: /dark mode|тёмный режим|dunkler modus/i }).click();

  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
});

test('user can switch the language and keep it after reload', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name.startsWith('mobile'), 'The language control uses the mobile drawer there.');

  await page.goto('./');
  await page.evaluate(() => localStorage.setItem('i18nextLng', 'en'));
  await page.reload();

  await page.getByRole('button', { name: 'English' }).click();
  await expect(page.getByText('Language selection', { exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Russian' }).click();

  await expect(page.getByRole('button', { name: 'Русский' })).toBeVisible();
  await page.reload();
  await expect(page.getByRole('button', { name: 'Русский' })).toBeVisible();
});
