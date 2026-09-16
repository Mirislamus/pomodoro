import { test, expect } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';

test.describe('visual baseline comparison', () => {
  const configs = [
    {
      name: 'timer-light-1280x720.png',
      theme: 'light',
      viewport: { width: 1280, height: 720 },
      url: './ru/',
    },
    {
      name: 'timer-dark-1280x720.png',
      theme: 'dark',
      viewport: { width: 1280, height: 720 },
      url: './ru/',
    },
    {
      name: 'timer-light-320x642.png',
      theme: 'light',
      viewport: { width: 320, height: 642 },
      url: './ru/',
    },
    {
      name: 'timer-dark-320x642.png',
      theme: 'dark',
      viewport: { width: 320, height: 642 },
      url: './ru/',
    },
  ];

  for (const config of configs) {
    test(`matches baseline ${config.name}`, async ({ page }, testInfo) => {
      test.skip(testInfo.project.name !== 'chromium', 'Visual baseline comparison run in Chromium');

      await page.setViewportSize(config.viewport);
      await page.addInitScript(theme => {
        localStorage.setItem('chakra-ui-color-mode', theme);
        localStorage.setItem('i18nextLng', 'ru');
      }, config.theme);

      await page.goto(config.url);
      await expect(page.getByText('25:00', { exact: true })).toBeVisible();

      await page.waitForTimeout(500);

      const baselinePath = path.resolve('tests/e2e/baseline', config.name);
      expect(fs.existsSync(baselinePath)).toBe(true);

      const currentScreenshot = await page.screenshot();
      expect(currentScreenshot).toMatchSnapshot(config.name, { maxDiffPixelRatio: 0.02 });
    });
  }
});
