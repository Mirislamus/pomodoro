import { test, expect } from '@playwright/test';

test.describe('Inter universal font loading and rendering', () => {
  test('font is loaded and renders Latin, Cyrillic, and numbers across weights', async ({ page }) => {
    await page.goto('./');

    // Ensure document fonts have completed loading
    await page.evaluate(() => document.fonts.ready);

    // Verify Inter font is loaded and active for Latin
    const latinLoaded = await page.evaluate(() =>
      document.fonts.check('400 16px Inter', 'Pomodoro Focus Timer 25:00')
    );
    expect(latinLoaded).toBe(true);

    // Verify Inter font is active for Cyrillic
    const cyrillicLoaded = await page.evaluate(() =>
      document.fonts.check('500 16px Inter', 'Помидор таймер настройки звуки')
    );
    expect(cyrillicLoaded).toBe(true);

    // Verify Inter font is active for German umlauts
    const germanLoaded = await page.evaluate(() =>
      document.fonts.check('600 16px Inter', 'Einstellungen Äpfel Übermäßig')
    );
    expect(germanLoaded).toBe(true);
  });

  test('body and headings use Inter as primary font-family', async ({ page }) => {
    await page.goto('./');

    const bodyFont = await page.evaluate(() =>
      window.getComputedStyle(document.body).fontFamily
    );
    expect(bodyFont).toMatch(/^"?Inter"?/i);

    const timerFont = await page.locator('text=/\\d{2}:\\d{2}/').first().evaluate((el) =>
      window.getComputedStyle(el).fontFamily
    );
    expect(timerFont).toMatch(/^"?Inter"?/i);
  });
});
