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

test('numeric setting labels keep their title and helper text stacked', async ({ page }) => {
  await page.goto('./');
  await page.getByText(/настройки|settings/i, { exact: true }).click();

  const labelParts = page.locator('[data-scope="field"][data-part="label"]').first().locator(':scope > *');
  const title = await labelParts.nth(0).boundingBox();
  const helper = await labelParts.nth(1).boundingBox();

  expect(title).not.toBeNull();
  expect(helper).not.toBeNull();
  expect(helper!.y).toBeGreaterThanOrEqual(title!.y + title!.height);
});

test('sound menus open independently', async ({ page }) => {
  await page.goto('./');
  await page.getByText(/настройки|settings/i, { exact: true }).click();
  await page.getByRole('tab', { name: /звуки|sounds/i }).click();
  await page.getByRole('button', { name: /bell/i }).click();

  await expect(page.locator('[role="menu"]:visible')).toHaveCount(1);
});

test('settings tabs and actions keep the intended desktop layout', async ({ page }) => {
  const cssWarnings: string[] = [];
  page.on('console', message => {
    if (message.text().includes('Using kebab-case for css properties')) {
      cssWarnings.push(message.text());
    }
  });

  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto('./');
  await page.getByText(/настройки|settings/i, { exact: true }).click();

  const timerTab = page.getByRole('tab', { name: /таймер|timer/i });
  const tabStyles = await timerTab.evaluate(element => {
    const styles = getComputedStyle(element);
    return {
      cursor: styles.cursor,
      fontSize: Number.parseFloat(styles.fontSize),
      justifyContent: styles.justifyContent,
    };
  });

  expect(tabStyles).toEqual({ cursor: 'pointer', fontSize: 16, justifyContent: 'center' });

  const enabledButtons = page.locator('button:not(:disabled)');
  await expect
    .poll(async () => enabledButtons.evaluateAll(buttons => buttons.every(button => getComputedStyle(button).cursor === 'pointer')))
    .toBe(true);

  const scrollArea = page.locator('.simplebar-content-wrapper');
  const overflow = await scrollArea.evaluate(element => ({
    horizontal: element.scrollWidth - element.clientWidth,
    vertical: element.scrollHeight - element.clientHeight,
  }));

  expect(overflow.horizontal).toBeLessThanOrEqual(0);
  expect(overflow.vertical).toBeLessThanOrEqual(0);
  expect(cssWarnings).toEqual([]);
});

test('core layout keeps its published geometry across responsive widths', async ({ page }) => {
  const viewports = [
    { width: 1440, height: 900, contentInset: 110, circleSize: 500 },
    { width: 1024, height: 900, contentInset: 30, circleSize: 500 },
    { width: 768, height: 900, contentInset: 30, circleSize: 500 },
    { width: 390, height: 844, contentInset: 16, circleSize: 300 },
    { width: 320, height: 642, contentInset: 16, circleSize: 300 },
  ];

  await page.addInitScript(() => localStorage.setItem('chakra-ui-color-mode', 'dark'));

  for (const viewport of viewports) {
    await page.setViewportSize(viewport);
    await page.goto('./');

    const [headerBox, progressBox, bodyBackground, horizontalOverflow] = await Promise.all([
      page.locator('header').boundingBox(),
      page.locator('svg[width="500"][height="500"]').boundingBox(),
      page.locator('body').evaluate(element => getComputedStyle(element).backgroundColor),
      page.locator('html').evaluate(element => element.scrollWidth - element.clientWidth),
    ]);

    expect(headerBox).not.toBeNull();
    expect(progressBox).not.toBeNull();
    expect(headerBox!.x).toBe(viewport.contentInset);
    expect(progressBox!.width).toBe(viewport.circleSize);
    expect(bodyBackground).toBe('rgb(0, 0, 0)');
    expect(horizontalOverflow).toBeLessThanOrEqual(0);
  }
});

test('mobile stage dialog keeps the published top offset and backdrop', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 900 });
  await page.goto('./');
  await page.getByRole('button', { name: /pomodoro/i }).click();

  const dialog = page.getByRole('dialog');
  const backdrop = page.locator('[data-scope="dialog"][data-part="backdrop"]');
  await expect
    .poll(async () => {
      const box = await dialog.boundingBox();
      return box
        ? { x: Math.round(box.x), y: Math.round(box.y), width: Math.round(box.width) }
        : null;
    })
    .toEqual({ x: 31, y: 64, width: 328 });

  const backdropColor = await backdrop.evaluate(element => getComputedStyle(element).backgroundColor);
  expect(backdropColor).toBe('rgba(0, 0, 0, 0.48)');
});

test('settings switch uses its full row as one click target', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto('./');
  await page.getByText(/настройки|settings/i, { exact: true }).click();

  const checkbox = page.getByRole('checkbox', { name: /автозапуск|autostart/i });
  const clickTarget = checkbox.locator('..');
  const targetBox = await clickTarget.boundingBox();

  expect(targetBox).not.toBeNull();
  expect(targetBox!.width).toBeGreaterThan(300);
  await clickTarget.click({ position: { x: targetBox!.width / 2, y: targetBox!.height / 2 } });
  await expect(checkbox).toBeChecked();
});

test('focused checked switch keeps one focus ring and a contained white thumb', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto('./');
  await page.getByText(/настройки|settings/i, { exact: true }).click();

  const checkbox = page.getByRole('checkbox', { name: /автозапуск|autostart/i });
  await checkbox.focus();
  await page.keyboard.press('Space');

  const root = page.locator('[data-scope="switch"][data-part="root"]:visible');
  const label = root.locator('[data-part="label"]');
  const control = root.locator('[data-part="control"]');
  const thumb = root.locator('[data-part="thumb"]');
  const [controlBox, thumbBox] = await Promise.all([control.boundingBox(), thumb.boundingBox()]);
  const styles = await Promise.all(
    [root, label, control, thumb].map(locator =>
      locator.evaluate(element => ({
        background: getComputedStyle(element).backgroundColor,
        boxShadow: getComputedStyle(element).boxShadow,
      }))
    )
  );

  expect(controlBox).not.toBeNull();
  expect(thumbBox).not.toBeNull();
  expect(styles[0].boxShadow).toBe('none');
  expect(styles[1].boxShadow).toBe('none');
  expect(styles[2].boxShadow).not.toBe('none');
  expect(styles[3].background).toBe('rgb(255, 255, 255)');
  expect(thumbBox!.x).toBeGreaterThanOrEqual(controlBox!.x);
  expect(thumbBox!.x + thumbBox!.width).toBeLessThanOrEqual(controlBox!.x + controlBox!.width);
});

test('sound ranges match the published track fill and thumb geometry', async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('chakra-ui-color-mode', 'dark'));
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto('./');
  await page.getByText(/настройки|settings/i, { exact: true }).click();
  await page.getByRole('tab', { name: /звуки|sounds/i }).click();

  const slider = page.locator('[data-scope="slider"][data-part="root"]:visible').first();
  const parts = await Promise.all(
    ['control', 'track', 'range', 'thumb'].map(part =>
      slider.locator(`[data-part="${part}"]`).evaluate(element => {
        const styles = getComputedStyle(element);
        const rect = element.getBoundingClientRect();
        return {
          background: styles.backgroundColor,
          border: styles.border,
          boxShadow: styles.boxShadow,
          height: rect.height,
          centerY: rect.y + rect.height / 2,
        };
      })
    )
  );

  expect(parts[0].height).toBe(24);
  expect(parts[1].height).toBe(4);
  expect(parts[1].background).toBe('rgba(255, 255, 255, 0.08)');
  expect(parts[2].height).toBe(6);
  expect(parts[2].background).toBe('rgb(237, 68, 85)');
  expect(parts[2].centerY).toBe(parts[1].centerY);
  expect(parts[3].height).toBe(16);
  expect(parts[3].background).toBe('rgb(255, 255, 255)');
  expect(parts[3].border).toBe('1px solid rgba(0, 0, 0, 0)');
  expect(parts[3].boxShadow).not.toBe('none');
});

test('autostart begins the next stage with its full duration', async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem(
      'settings-storage',
      JSON.stringify({
        state: {
          settings: {
            count: 5,
            duration: 300,
            shortBreak: 5000,
            longBreak: 5000,
            hasAutoStart: true,
            alarmSound: 'alarm-bell',
            alarmSoundVolume: 0,
            tickSound: 'none',
            tickSoundVolume: 0,
            allowNotifications: false,
          },
        },
        version: 0,
      })
    );
    localStorage.removeItem('session-storage');
  });

  await page.goto('./');
  await page.getByRole('button', { name: /старт|start/i }).click();

  await expect
    .poll(async () => {
      const storedSession = await page.evaluate(() => localStorage.getItem('session-storage'));
      return storedSession ? JSON.parse(storedSession).state.session.stage : null;
    })
    .toBe('short-break');
  await expect(page.getByRole('button', { name: /пауза|pause/i })).toBeVisible();
  await expect(page.getByText(/00:0[1-5]/)).toBeVisible();
});

test('tooltip arrow uses the same background as its content', async ({ page }) => {
  await page.goto('./');

  await page.locator('[data-scope="tooltip"][data-part="trigger"]').first().hover();
  const tooltip = page.locator('[data-scope="tooltip"][data-part="content"]:visible');
  await expect(tooltip).toBeVisible();

  const colors = await tooltip.evaluate(element => {
    const arrowTip = element.querySelector('[data-part="arrow-tip"]');
    return {
      content: getComputedStyle(element).backgroundColor,
      arrow: arrowTip ? getComputedStyle(arrowTip).backgroundColor : null,
    };
  });

  expect(colors.arrow).toBe(colors.content);
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
